import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Error} from "./error";
import {ErrorService} from "./error.service";

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ["./error-toast.component.scss"]
})
export class ErrorToastComponent implements OnInit {

  @ViewChild("toasts")
  container!: ElementRef<HTMLDivElement>;

  errors: Map<number, Error> = new Map();
  private errorCounter = 0;

  constructor(private service: ErrorService) {}

  ngOnInit(): void {
    this.service.toastError.subscribe(next => {
      let current = this.errorCounter++;
      this.errors.set(current, next);
      let toast = this.container.nativeElement.querySelector(`[data-toast-id="${current}"]`);
      setTimeout(() => toast?.classList.remove("fade-in"), 300);
      setTimeout(() => {
        toast = this.container.nativeElement.querySelector(`[data-toast-id="${current}"]`);
        if (!toast) return;
        toast.classList.add("fade-out");
        setTimeout(() => this.errors.delete(current), 350);
      }, 15000);
    });
  }

  displayType(error: Error) {
    let firstDigit = ("" + error.httpCode)[0];
    switch (firstDigit) {
      case "5": return "is-danger";
      case "4": return "is-warning";
      default: return "is-info";
    }
  }

}
