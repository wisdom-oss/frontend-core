import {
  HttpResponseBase,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {USE_LOADER} from "common";
import {firstValueFrom, tap, Observable} from "rxjs";

import {LoaderService} from "./loader.service";

/**
 * Interceptor for the loading, this allows detecting load change.
 *
 * This will report to the {@link LoaderService} when the {@link USE_LOADER}
 * context is set.
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  /**
   * Constructor.
   * @param service Loader service to report to
   */
  constructor(private service: LoaderService) {}

  /**
   * Check whether {@link USE_LOADER} is set.
   * If so, report to the service.
   *
   * When the request returns this also notifies the service.
   * @param request Request to check
   * @param next Next interceptor
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let context = request.context.get(USE_LOADER);
    if (!context) return next.handle(request);

    let observable = next.handle(request);
    let resolver: () => void;
    let promise = new Promise<void>(resolve => resolver = resolve);
    if (typeof context == "string") this.service.addLoader(promise, context);
    else this.service.addLoader(promise);
    return observable.pipe(tap({finalize: resolver!}));
  }
}
