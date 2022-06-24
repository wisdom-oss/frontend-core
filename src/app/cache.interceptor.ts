import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {USE_CACHE} from "common";
import {tap, Observable} from "rxjs";

/**
 * Interceptor to handle cache-control behaviour via
 * [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) and
 * [Last-Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified)
 * headers.
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  /** Map holding all ETags received from the server. */
  private eTagMap: Map<string, string> = new Map();
  /** Map holding all timestamps sent by the server. */
  private lastModifiedMap: Map<string, string> = new Map();

  /**
   * Intercept requests to insert caching headers, if the context
   * {@link USE_CACHE} is set.
   * Will append `If-None-Match` and `Last-Modified-Since` if possible.
   *
   * @param request Any http request
   * @param next The next interceptor or another request handler
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // do not insert any cache headers if USE_CACHE is false
    if (!request.context.get(USE_CACHE)) return next.handle(request);

    let key = request.urlWithParams;

    let eTag = this.eTagMap.get(key);
    if (eTag) request.headers.set("If-None-Match", eTag);

    let lastModified = this.lastModifiedMap.get(key);
    if (lastModified) request.headers.set("If-Modified-Since", lastModified);

    return next.handle(request.clone({
      headers: request.headers
    })).pipe(tap(event => {
      if (!(event instanceof HttpResponse)) return;

      let eTag = event.headers.get("ETag");
      if (eTag) this.eTagMap.set(key, eTag);

      let lastModified = event.headers.get("Last-Modified");
      if (lastModified) this.lastModifiedMap.set(key, lastModified);
    }));
  }
}
