import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class SanitizeUrlInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let {url} = request;
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
