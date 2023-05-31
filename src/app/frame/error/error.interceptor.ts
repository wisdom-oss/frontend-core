import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {USE_ERROR_HANDLER} from "common";
import {catchError, throwError, Observable} from "rxjs";

import {ErrorService} from "./error.service";

/**
 * Interceptor for http request.
 * This one is set as the last element to capture http error that were not
 * handled somewhere else.
 *
 * These unhandled errors will be passed to the {@link ErrorService}.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * Constructor.
   * @param service Error service to pass the errors into
   */
  constructor(private service: ErrorService) {}

  /**
   * Intercept all returning errors and pass them to the {@link ErrorService}.
   * @param request Request to check
   * @param next Next interceptor, usually none for this interceptor
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let context = request.context.get(USE_ERROR_HANDLER);
    if (context === USE_ERROR_HANDLER.handler.CUSTOM) return next.handle(request);

    return next.handle(request).pipe(
      catchError(requestError => {
        if (!requestError.ok) {
          this.service.throwError({
            httpCode: requestError.error.httpCode ?? requestError.status,
            httpError: requestError.error.httpError ?? requestError.statusText,
            error: requestError.error.error,
            errorName: requestError.error.errorName ?? requestError.name,
            errorDescription: requestError.error.errorDescription ??
              requestError.error.message ??
              requestError.message
          }, context);
        }
        return throwError(() => requestError);
      })
    )
  }
}
