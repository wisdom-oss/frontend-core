import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {
  LoaderInjector
} from "common";

/**
 * Loader service handling the communication between component and interceptor
 * and guard.
 *
 * All loading updates will be reported to this service.
 * This is then communicated to the component to display the loader or not.
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /** All request that we currently await. */
  private promises: Set<Promise<any>> = new Set();
  /**
   * Internally stored texts to display on the component.
   * @internal
   */
  private _displayTexts: Map<Promise<any>, string> = new Map();
  /**
   *  @link Subject} to display the loadings texts, to be used as
   *  {@link Observable}.
   */
  private displayTextSubject = new Subject<string[]>();

  constructor(private injector: LoaderInjector) {
    this.injector.loaders.subscribe(([p, t]) => this.addLoader(p, t));
    this.loading.subscribe(() => console.log(this.promises));
  }

  /** Texts to display on the component. */
  get displayTexts(): Observable<string[]> {
    return this.displayTextSubject.asObservable();
  }

  /**
   * {@link Subject} stating whether the app currently awaits requests.
   * @internal
   */
  private _loading = new Subject<boolean>();
  /** {@link Observable} stating whether the app currently awaits requests. */
  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  /**
   * Add a loader to the currently awaited requests.
   * @param toResolve Promise to wait for
   * @param displayText Optional text to display under the loader animation
   */
  addLoader(toResolve: Promise<any>, displayText?: string) {
    this.promises.add(toResolve);
    if (displayText) {
      this._displayTexts.set(toResolve, displayText);
      this.displayTextSubject.next(Array.from(this._displayTexts.values()));
    }
    this._loading.next(true);
    toResolve
      .then(() => this.promises.delete(toResolve))
      .then(() => this._displayTexts.delete(toResolve))
      .then(() => this.displayTextSubject.next(Array.from(this._displayTexts.values())))
      .then(() => this._loading.next(!!this.promises.size))
  }

  /** Clear all loading and ignore the updates of these requests. */
  clearLoading() {
    this.promises = new Set();
    this._displayTexts.clear();
    this.displayTextSubject.next([]);
    this._loading.next(false);
  }

}
