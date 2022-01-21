import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {AuthStorageService} from "./auth-storage.service";

/** Key for the token. */
const TOKEN_HEADER_KEY = "Authorization";

/** Interceptor to inject the authorization token into every request. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authStorage: AuthStorageService) {}

  /**
   * Injects the token as Bearer authentication into a HttpRequest
   * @param request The request the token should be injected in
   * @param next The next handler to operate on the request
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.authStorage.accessToken;
    if (token) {
      authRequest = request.clone({
        // this updates the header without removing every other header
        headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token)
      });
    }
    return next.handle(authRequest);
  }
}
