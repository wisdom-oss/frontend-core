import {EventEmitter, Injectable, Output} from "@angular/core";
import {ActivatedRoute, Router, NavigationStart} from "@angular/router";

import {Error} from "./error";
import {USE_ERROR_HANDLER} from "common";

/** Error service for collecting errors from the {@link ErrorInterceptor}. */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  /** Event emitter for indicating the presence of a curtain error. */
  curtainErrorPresent = new EventEmitter<false | Error>();

  /** Event emitter for displaying toast notifications for errors. */
  toastError = new EventEmitter<Error>();

  /**
   * Constructor.
   *
   * This also creates an event handler for the NavigationStart event in order to reset
   * the presence of curtain errors (i.e., set curtainErrorPresent to false).
   *
   * @param router The Router instance to subscribe to events.
   */
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.curtainErrorPresent.emit(false);
    })
  }

  /**
   * Emit an error.
   *
   * This method is used by the {@link ErrorInterceptor} to pass errors to this
   * service.
   *
   * @param error The error to be emitted.
   * @param type The type of error handling to be applied.
   *             It should match the ErrorHandler enum values exposed via
   *             {@link USE_ERROR_HANDLER#handler}.
   */
  throwError(error: Error, type: ThisType<typeof USE_ERROR_HANDLER.handler>) {
    switch (type) {
      case USE_ERROR_HANDLER.handler.CURTAIN:
        return this.curtainErrorPresent.emit(error);

      case USE_ERROR_HANDLER.handler.TOAST:
        return this.toastError.emit(error);
    }
  }
}
