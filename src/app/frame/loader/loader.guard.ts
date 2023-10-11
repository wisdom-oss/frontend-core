import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";

import {LoaderService} from "./loader.service";

/**
 * Guard to be called when a navigation starts.
 * This will reset the loader.
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderGuard  {

  /**
   * Constructor.
   * @param service Service to report the navigation change
   */
  constructor(private service: LoaderService) {}

  /** Report on navigation change for direct routes. */
  canActivate(): true {
    this.service.clearLoading();
    return true;
  }

  /** Report on navigation change for child routes. */
  canActivateChild(): true {
    this.service.clearLoading();
    return true;
  }

}
