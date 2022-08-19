import {Location} from "@angular/common";
import {Component, OnInit} from "@angular/core";

import {ErrorService} from "./error.service";

/**
 * Component covering the entire main container to display an error that has not
 * been handled.
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {

  /** Whether to show the component. */
  showError: boolean = false;

  /** Http code of the error. */
  httpCode?: number | string;
  /** Http code name of the error. */
  httpError?: string;
  /** Internal error code. */
  errorCode?: string;
  /** Internal error name. */
  errorName?: string;
  /** Internal error description. */
  errorDescription?: string;

  /**
   * Utility function to return the bulma type name for certain http error
   * codes.
   */
  get showType(): string {
    let codeType = ("" + this.httpCode)[0];
    switch (codeType) {
      case "5": return "danger";
      case "4": return "warning";
      default: return "info";
    }
  }

  /**
   * Constructor.
   * @param location Location service to allow traversing the history
   * @param service Error service collecting the errors
   */
  constructor(
    private location: Location,
    private service: ErrorService
  ) {
    this.service.errorPresent.subscribe(
      val => {
        if (val) {
          this.showError = true;
          Object.assign(this, val);
          if (val.error) this.errorCode = val.error;
        }
        else {
          this.showError = false;
          delete this.httpCode;
          delete this.httpError;
          delete this.errorCode;
          delete this.errorName;
          delete this.errorDescription;
        }
      });
  }

  /** Return one step in the history. */
  goBack() {
    this.location.back();
  }

}
