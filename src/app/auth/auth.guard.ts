import {Injectable} from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable, throwError} from "rxjs";

import {AuthStorageService} from "./auth-storage.service";
import {AuthService} from "./auth.service";

/**
 * Guard checking if the user is signed in, it needs to have a valid access
 * token to browser further.
 *
 * Also tries to refresh the token if the old one is not valid.
 */
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor.
   * @param authStorage The storage containing the tokens
   * @param authService The service used to interact with the auth server
   * @param router The router to route to the login if necessary
   */
  constructor(
    private authStorage: AuthStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Method deciding if a user is allowed to navigate to the requested route.
   *
   * This one checks if the current token is still valid.
   * If the token is not valid it tries to refresh the token.
   * If no refreshing is the possible the route will be set to the login page.
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | UrlTree | boolean {
    // ignore login path per se
    if (route.url[0]?.path === "login") return true;
    let loginUrlTree = this.router.parseUrl("/login");

    // if no token is available the use can't be logged in
    let token = this.authStorage.accessToken;
    if (!token) return loginUrlTree;

    // wait for the server to reply with a token check
    return new Observable(subscriber => {
      this.authService.validate(token!).subscribe({
        next: response => {
          // token is valid, you're ready to go
          subscriber.next(true);
          subscriber.complete();
        },

        error: errResponse => {
          /**
           * Small function to avoid code depletes.
           * Clears the auth storage and sends the user to the login page.
           */
          let returnToLogin = () => {
            this.authStorage.clear();
            subscriber.next(loginUrlTree);
            subscriber.complete();
          };

          if (this.authStorage.refreshToken) {
            // if a refresh token is present, try to refresh
            this.authService.refresh(this.authStorage.refreshToken).subscribe({
              next: refreshResponse => {
                // refresh token was valid, update with new data
                this.authStorage.accessToken = refreshResponse.access_token;
                this.authStorage.refreshToken = refreshResponse.refresh_token;
                this.authStorage.scopes = refreshResponse.scope;
                this.authStorage.expiresIn = refreshResponse.expires_in;
                subscriber.next(true);
                subscriber.complete();
                return;
              },

              error: refreshErrResponse => {
                // token is no valid, send the user to the login page
                if (refreshErrResponse.status === 400) return returnToLogin();
                // TODO: handle non-400 status codes gracefully
              }
            });
            return;
          }

          return returnToLogin();
        }
      });
    });
  }

}
