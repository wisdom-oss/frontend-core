import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private promises: Promise<any>[] = [];
  private _displayTexts: Map<Promise<any>, string> = new Map();
  private displayTextSubject = new Subject<string[]>();
  get displayTexts(): Observable<string[]> {
    return this.displayTextSubject.asObservable();
  }

  private _loading = new Subject<boolean>();
  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  addLoader(toResolve: Promise<any>, displayText?: string) {
    this.promises.push(toResolve);
    if (displayText) {
      this._displayTexts.set(toResolve, displayText);
      this.displayTextSubject.next(Array.from(this._displayTexts.values()));
    }
    this._loading.next(true);
    toResolve
      .then(() => Promise.allSettled(this.promises))
      .then(() => this._loading.next(false))
      .then(() => {
        this._displayTexts.delete(toResolve);
        this.displayTextSubject.next(Array.from(this._displayTexts.values()));
      })
      .then(() => this.promises = []);
  }

  clearLoading() {
    this.promises = [];
    this._displayTexts.clear();
    this.displayTextSubject.next([]);
    this._loading.next(false);
  }

}
