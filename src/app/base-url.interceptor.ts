import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";
import {join} from "path-browserify";

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
