import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

/** Key for the access token. */
const ACCESS_TOKEN_KEY = "auth-token";
/** Key for the refresh token. */
const REFRESH_TOKEN_KEY = "auth-refresh-token";
/** Key for the scopes. */
const SCOPES_KEY = "auth-scopes";

/** Class for storing the data received from the auth server. */
@Injectable({
  providedIn: "root"
})
export class AuthStorageService {

  // TODO: doc the getter and setter when https://github.com/microsoft/tsdoc/issues/308 is closed

  constructor() { }

  /** Clears the session storage from the values stored by this service. */
  clear(): void {
    [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, SCOPES_KEY]
      .forEach(globalThis.sessionStorage.removeItem);
  }

  /** Internal function to set session storage values. */
  private static setStorage(data: string | null, key: string) {
    if (data) globalThis.sessionStorage.setItem(key, data);
    else globalThis.sessionStorage.removeItem(key);
  }
  /** Internal function to get session storage values. */
  private static getStorage(key: string) {
    return globalThis.sessionStorage.getItem(key);
  }

  set accessToken(token: string | null) {
    AuthStorageService.setStorage(token, ACCESS_TOKEN_KEY);
  }
  get accessToken() {
    return AuthStorageService.getStorage(ACCESS_TOKEN_KEY);
  }

  set refreshToken(token: string | null) {
    AuthStorageService.setStorage(token, REFRESH_TOKEN_KEY);
  }
  get refreshToken() {
    return AuthStorageService.getStorage(REFRESH_TOKEN_KEY);
  }

  set scopes(scopes: string | null) {
    AuthStorageService.setStorage(scopes, SCOPES_KEY);
  }
  get scopes() {
    return AuthStorageService.getStorage(SCOPES_KEY);
  }

}
