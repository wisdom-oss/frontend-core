import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import PostOAuthToken200 from "./response_types/login/PostOAuthToken200";
import PostOAuthToken400 from "./response_types/login/PostOAuthToken400";
import PostOAuthToken401 from "./response_types/login/PostOAuthToken401";
import PostRevoke200 from "./response_types/login/PostRevoke200";
import PostRevoke403 from "./response_types/login/PostRevoke403";
import {join} from "path-browserify";

// FIXME: this url is incorrect and the base needs to be moved
/** Url for the interaction. */
const AUTH_API = "localhost:8090/auth/";

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
  responseType: "json"
}

/**
 * Service handling the OAuth interaction.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /**
   * Logs the user in.
   * @param username Username of the user
   * @param password Password of the user
   */
  login(username: string, password: string) {
    return this.http.post(join(AUTH_API, "oauth/token"), {
      grant_type: "password",
      username,
      password
    }, httpOptions) as Observable<
      {status: 200} & HttpResponse<PostOAuthToken200> |
      {status: 400} & HttpResponse<PostOAuthToken400> |
      {status: 401} & HttpResponse<PostOAuthToken401>
    >;
  }

  /**
   * Refreshes the current token.
   * @param token Refresh token
   */
  refresh(token: string) {
    return this.http.post(join(AUTH_API, "oauth/token"), {
      grant_type: "refresh_token",
      refresh_token: token
    }, httpOptions) as ReturnType<AuthService["login"]>;
  }


  /**
   * Revokes the token.
   * @param token Token of the user
   */
  logout(token: string) {
    return this.http.post(join(AUTH_API, "oauth/token"), {
      token
    }, httpOptions) as Observable<{status: 200} & HttpResponse<PostRevoke200> |
      {status: 403} & HttpResponse<PostRevoke403>>
  }

}
