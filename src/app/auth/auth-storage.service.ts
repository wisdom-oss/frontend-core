import {Injectable} from "@angular/core";

/** Key for the access token. */
const ACCESS_TOKEN_KEY = "auth-token";
/** Key fo the expiration date. */
const EXPIRES_IN_KEY = "auth-expires-in";
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

  /** Clears the session storage from the values stored by this service. */
  clear(): void {
    for (let key of [
      ACCESS_TOKEN_KEY,
      REFRESH_TOKEN_KEY,
      EXPIRES_IN_KEY,
      SCOPES_KEY
    ]) {
      globalThis.sessionStorage.removeItem(key);
    }
  }

  /** Internal function to set session storage values. */
  private static setStorage(data: string | null | undefined, key: string) {
    if (data) globalThis.sessionStorage.setItem(key, data);
    else globalThis.sessionStorage.removeItem(key);
  }
  /** Internal function to get session storage values. */
  private static getStorage(key: string) {
    return globalThis.sessionStorage.getItem(key);
  }

  /**
   * Set the access token.
   * @param token May be a nullish value or the token
   */
  set accessToken(token: string | null | undefined) {
    AuthStorageService.setStorage(token, ACCESS_TOKEN_KEY);
  }

  /**
   * Get the access token.
   * @returns A nullish value or the token
   */
  get accessToken() {
    return AuthStorageService.getStorage(ACCESS_TOKEN_KEY);
  }

  /**
   * Set the expiration date.
   * @param unixTime May be a nullish value or the unix time as number or string
   */
  set expiresIn(unixTime: number | string | null | undefined) {
    AuthStorageService.setStorage(`${unixTime}`, EXPIRES_IN_KEY);
  }

  /**
   * Returns the expiration date.
   * @returns The date is unix timestamp or NaN
   */
  get expiresIn(): number {
    let expiresIn = AuthStorageService.getStorage(EXPIRES_IN_KEY);
    if (expiresIn) return parseInt(expiresIn);
    return NaN;
  }

  /**
   * Set the refresh token.
   * @param token May be a nullish value or the token
   */
  set refreshToken(token: string | null | undefined) {
    AuthStorageService.setStorage(token, REFRESH_TOKEN_KEY);
  }

  /**
   * Get the refresh token.
   * @returns A nullish value or the token
   */
  get refreshToken() {
    return AuthStorageService.getStorage(REFRESH_TOKEN_KEY);
  }

  /**
   * Sets the scopes.
   * @param scopes May be a nullish value or the scopes
   */
  set scopes(scopes: string | null | undefined) {
    AuthStorageService.setStorage(scopes, SCOPES_KEY);
  }

  /**
   * Get the scopes.
   * @returns The scopes divided by " " or a nullish value
   */
  get scopes() {
    return AuthStorageService.getStorage(SCOPES_KEY);
  }

}
