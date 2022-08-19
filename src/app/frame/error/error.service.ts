import {EventEmitter, Injectable, Output} from "@angular/core";
import {ActivatedRoute, Router, NavigationStart} from "@angular/router";

import {Error} from "./error";

/** Error service to collect errors from the {@link ErrorInterceptor}. */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  /** Event emitter whether an event is currently present. */
  errorPresent = new EventEmitter<false | Error>();

  /**
   * Constructor.
   *
   * This also creates an event handler on the {@link NavigationStart} event in
   * order to reset the error presence.
   * (Set {@link errorPresent} to `false`.)
   * @param router Router to subscribe to events
   */
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.errorPresent.emit(false);
    })
  }

  /**
   * Emit an error.
   * This is used by the {@link ErrorInterceptor} to pass errors to this
   * service.
   * @param error Error to pass
   */
  throwError(error: Error) {
    this.errorPresent.emit(error);
  }
}
