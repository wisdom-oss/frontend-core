import {EventEmitter, Injectable, Output} from "@angular/core";
import {ActivatedRoute, Router, NavigationStart} from "@angular/router";

import {Error} from "./error";

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
