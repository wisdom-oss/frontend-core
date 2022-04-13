import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private promises: Promise<any>[] = [];

  private _loading = new Subject<boolean>();
  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  addLoader(toResolve: Promise<any>) {
    this.promises.push(toResolve);
    this._loading.next(true);
    toResolve
      .then(() => Promise.allSettled(this.promises))
      .then(() => this._loading.next(false))
      .then(() => this.promises = []);
  }

  clearLoading() {
    this.promises = [];
    this._loading.next(false);
  }

}
