import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpContextToken
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {USE_BASE_URL, USE_API_URL} from "common";
import {Observable} from "rxjs";

import {environment} from "../environments/environment";

/** Class used to prepend the base url to requests. */
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

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
