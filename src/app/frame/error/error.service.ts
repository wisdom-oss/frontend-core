import {EventEmitter, Injectable, Output} from '@angular/core';
import {Error} from "./error";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorPresent = new EventEmitter<false | Error>();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.errorPresent.emit(false);
    })
  }

  throwError(error: Error) {
    this.errorPresent.emit(error);
  }
}
