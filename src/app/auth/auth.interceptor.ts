import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap, Observable} from "rxjs";

import {SEND_AUTH, USE_API_URL} from "common";

/** Key for the token. */
const TOKEN_HEADER_KEY = "Authorization";

/**
 * Interceptor to inject the authorization token into requests.
 *
 * Only requests with {@link SEND_AUTH} to `true` or {@link USE_API_URL} to
 * `true` while {@link SEND_AUTH} is `undefined` will get the authorization
 * header including the token.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructor.
   */
  constructor() {}

  /**
   * Injects the token as Bearer authentication into a HttpRequest
   * @param request The request the token should be injected in
   * @param next The next handler to operate on the request
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    switch (request.context.get(SEND_AUTH)) {
      case true: break; // allow
      case false: return next.handle(request); // deny, pass to next handler
      case undefined: // check for use api context
        if (request.context.get(USE_API_URL)) break;
        return next.handle(request);
    }

    // TODO: update this request to use auth service data
    let authRequest = request;
    // const token = this.authStorage.accessToken;
    // if (token) {
    //   authRequest = request.clone({
    //     // this updates the header without removing every other header
    //     headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token)
    //   });
    // }
    return next.handle(authRequest).pipe(tap(event => {
      // TODO: handle if the event is 401
    }));
  }
}
