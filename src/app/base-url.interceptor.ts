import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {join} from "path-browserify";
import {Observable} from "rxjs";

import {environment} from "../environments/environment";

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
    return next.handle(
      // prepend the request url with the base url from the environment
      request.clone({url: environment.baseUrl +  request.url})
    );
  }
}
