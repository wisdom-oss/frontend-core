import {Location} from "@angular/common";
import {Component, OnInit} from "@angular/core";

import {ErrorService} from "./error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {

  showError: boolean = false;

  httpCode?: number | string;
  httpError?: string;
  errorCode?: string;
  errorName?: string;
  errorDescription?: string;

  get showType(): string {
    let codeType = ("" + this.httpCode)[0];
    switch (codeType) {
      case "5": return "danger";
      case "4": return "warning";
      default: return "info";
    }
  }

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

  goBack() {
    this.location.back();
  }

}
