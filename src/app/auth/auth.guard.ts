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
  ): Observable<boolean> | UrlTree | boolean {
    if (route.url[0]?.path === "login") return true;
    let token = this.authStorage.accessToken;
    if (!token) return this.router.parseUrl("/login");
    return new Observable(subscriber => {
      this.authService.validate(token!).subscribe({
        next: response => {
          subscriber.next(true);
          subscriber.complete();
        },
        error: errResponse => {
          // TODO: maybe do something with the error response
          subscriber.next(false);
          subscriber.complete();
        }
      });
    });
  }

}
