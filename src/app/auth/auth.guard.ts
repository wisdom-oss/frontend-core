import {Injectable} from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";

import {AuthStorageService} from "./auth-storage.service";
import {AuthService} from "./auth.service";

/**
 * Guard checking if the user is signed in, it needs to have a valid access
 * token to browser further.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authStorage: AuthStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | UrlTree | boolean {
    if (route.url[0]?.path === "login") return true;
    let token = this.authStorage.accessToken;
    let loginUrlTree = this.router.parseUrl("/login");
    if (!token) return loginUrlTree;
    return new Observable(subscriber => {
      this.authService.validate(token!).subscribe({
        next: response => {
          subscriber.next(true);
          subscriber.complete();
        },
        error: errResponse => {
          if (errResponse.status !== 401) {
            // TODO: handle non 401 codes gracefully
            subscriber.next(false);
            subscriber.complete();
            return;
          }

          // TODO: first add refresh try here

          this.authStorage.clear();
          subscriber.next(loginUrlTree);
          subscriber.complete();
          return;
        }
      });
    });
  }

}
