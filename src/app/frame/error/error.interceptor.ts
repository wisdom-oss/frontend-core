import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {USE_ERROR_CURTAIN} from "common";
import {catchError, throwError, Observable} from "rxjs";

import {ErrorService} from "./error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private service: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let context = request.context.get(USE_ERROR_CURTAIN);
    if (!context) return next.handle(request);

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
