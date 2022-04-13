import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class LoaderGuard implements CanActivate {

  constructor(private service: LoaderService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.service.clearLoading();
    return true;
  }

}
