import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

/**
 * Interceptor to fix up weird urls.
 *
 * Currently, this checks for too many slashes (`/`) and reduces them to the
 * correct amount.
 */
@Injectable()
export class SanitizeUrlInterceptor implements HttpInterceptor {

  /**
   * Intercepting a request and fix it up if too many slashes (`/`) were
   * injected somewhere.
   *
   * This interceptor is usually the last before the request will be sent to the
   * public.
   * @param request Request to check and sanitize
   * @param next The next interceptor
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let {url} = request;
    if (!url.includes("://")) return next.handle(request);
    let [protocol, pathWithParams] = url.split("://");
    let [path, ...query] = pathWithParams.split("?");
    path = path.replace(/\/+/g, "/");
    let newUrl = `${protocol}://${path}`;
    if (query.length) {
      newUrl += `?${query.join("?")}`;
    }
    return next.handle(request.clone({
      url: newUrl
    }));
  }
}
