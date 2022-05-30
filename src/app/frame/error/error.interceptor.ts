import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ErrorService} from "./error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private service: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(requestError => {
        if (!requestError.ok) {
          console.log(requestError);
          this.service.throwError({
            httpCode: requestError.error.httpCode ?? requestError.status,
            httpError: requestError.error.httpError ?? requestError.statusText,
            error: requestError.error.error,
            errorName: requestError.error.errorName ?? requestError.name,
            errorDescription: requestError.error.errorDescription ?? requestError.message
          });
        }
        return throwError(() => new Error(requestError));
      })
    )
  }
}
