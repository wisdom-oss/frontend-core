import {Component, OnInit} from '@angular/core';
import {Error} from "./error";
import {ErrorService} from "./error.service";

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ["./error-toast.component.scss"]
})
export class ErrorToastComponent implements OnInit {

  errors: Map<number, Error> = new Map();
  private errorCounter = 0;

  constructor(private service: ErrorService) {}

  ngOnInit(): void {
    this.service.toastError.subscribe(next => {
      this.errors.set(this.errorCounter++, next);
    });
  }

  displayType(error: Error) {
    let firstDigit = ("" + error.httpCode)[0];
    switch (firstDigit) {
      case "5": return "is-danger";
      case "4": return "is-warn";
      default: return "is-info";
    }
  }

}
