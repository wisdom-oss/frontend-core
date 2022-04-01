import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {USE_CACHE} from "common";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private eTagMap: Map<string, string> = new Map();
  private lastModifiedMap: Map<string, string> = new Map();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.context.get(USE_CACHE)) return next.handle(request);
    let key = request.urlWithParams;
    let cacheHeaders = new HttpHeaders();
    if (this.eTagMap.has(key)) {
      request.headers.set("If-None-Match", this.eTagMap.get(key)!);
    }
    if (this.lastModifiedMap.has(key)) {
      request.headers.set("If-Modified_Since", this.lastModifiedMap.get(key)!);
    }
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
