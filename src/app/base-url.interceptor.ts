import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpContextToken
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {join} from "path-browserify";
import {Observable} from "rxjs";

import {environment} from "../environments/environment";

/**
 * {@link HttpContextToken} used to determine if the base url should be used.
 *
 * Defaults to `true`.
 */
export const USE_BASE_URL = new HttpContextToken<boolean>(() => true);

/**
 * {@link HttpContextToken} used to determine if the api url should be used.
 *
 * Defaults to `false`.
 */
export const USE_API_URL = new HttpContextToken<boolean>(() => false);

/** Class used to prepend the base url to requests. */
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() {}

  /**
   * Prepends the base url from the environment to request url
   * @param request Request to prepend the url
   * @param next The next handler
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let prependUrl = "";
    if (request.context.get(USE_BASE_URL)) prependUrl = environment.baseUrl;
    if (request.context.get(USE_API_URL)) prependUrl = environment.apiUrl;
    return next.handle(
      // prepend the api url with the base url from the environment
      request.clone({url: prependUrl +  request.url})
    );
  }
}
