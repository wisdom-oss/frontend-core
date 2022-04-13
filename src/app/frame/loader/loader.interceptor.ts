import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LoaderService} from "./loader.service";
import {USE_LOADER} from "common";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private service: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.context.get(USE_LOADER)) return next.handle(request);
    let observable = next.handle(request);
    this.service.addLoader(new Promise(resolve => {
      observable = observable.pipe(tap({
        next(value) {
          if (value instanceof HttpResponse) {
            return resolve(value);
          }
        },
        error(err) {
          if (err instanceof HttpErrorResponse) {
            return resolve(err);
          }
        }
      }))
    }))
    return observable;
  }
}
