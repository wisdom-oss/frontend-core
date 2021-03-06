import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {USE_CACHE, USE_API_URL, USE_ERROR_CURTAIN} from "common";
import {join} from "path-browserify";
import {Observable} from "rxjs";

import PostOAuthToken200 from "./response_types/login/PostOAuthToken200";
import PostRevoke200 from "./response_types/login/PostRevoke200";

/** Url for the interaction. */
const AUTH_URL = "auth";

/**
 * Options for the post request in the service.
 * As per reference the content type is always "x-www-form-urlencoded" instead
 * of "json".
 * The response is a json though.
 */
const httpOptions: Parameters<HttpClient["post"]>[2] = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  }),
  responseType: "json",
  context: new HttpContext()
    .set(USE_API_URL, true)
    .set(USE_CACHE, false)
    .set(USE_ERROR_CURTAIN, false)
}

/**
 * Service handling the OAuth interaction.
 */
@Injectable({
  providedIn: "root"
})
export class AuthService {

  /**
   * Constructor.
   * @param http For making requests with the auth server
   */
  constructor(private http: HttpClient) {}

  /**
   * Logs the user in.
   * @param username Username of the user
   * @param password Password of the user
   */
  login(username: string, password: string) {
    return this.http.post(
      join(AUTH_URL, "oauth/token"),
      new HttpParams({
        fromObject: {
          grant_type: "password",
          username,
          password
        }
      }),
      httpOptions
    ) as Observable<PostOAuthToken200>;
  }

  /**
   * Checks if the given token is valid.
   * @param token Token to check
   */
  validate(token: string) {
    return this.http.post(
      join(AUTH_URL, "oauth/check_token"),
      new HttpParams({fromObject: {token}}),
      httpOptions
    );
  }

  /**
   * Refreshes the current token.
   * @param token Refresh token
   */
  refresh(token: string) {
    return this.http.post(
      join(AUTH_URL, "oauth/token"),
      new HttpParams({
        fromObject: {
          grant_type: "refresh_token",
          refresh_token: token
        }
      }),
      httpOptions
    ) as Observable<PostOAuthToken200>;
  }

  /**
   * Revokes the token.
   * @param token Token of the user
   */
  logout(token: string) {
    return this.http.post(
      join(AUTH_URL, "oauth/revoke"),
      new HttpParams({fromObject: {
        token
      }}),
      httpOptions
    ) as Observable<PostRevoke200>;
  }

}
