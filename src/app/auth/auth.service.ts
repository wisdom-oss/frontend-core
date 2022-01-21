import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {join} from "path-browserify";
import {Observable} from "rxjs";

import PostOAuthToken200 from "./response_types/login/PostOAuthToken200";
import PostOAuthToken400 from "./response_types/login/PostOAuthToken400";
import PostOAuthToken401 from "./response_types/login/PostOAuthToken401";
import PostRevoke200 from "./response_types/login/PostRevoke200";
import PostRevoke403 from "./response_types/login/PostRevoke403";

/** Url for the interaction. */
const AUTH_API = "api/auth";

/**
 * Options for the post request in the service.
 * As per reference the content type is always "x-www-form-urlencoded" instead
 * of "json".
 * The response is a json though.
 */
const httpOptions: any = {
  headers: new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  }),
  responseType: "json",
  observe: "response"
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
    return this.http.post(
      join(AUTH_API, "oauth/token"),
      new HttpParams({
        fromObject: {
          grant_type: "password",
          username,
          password
        }
      }),
      // TS struggles with too many overload, hence this casting is needed to
      // unknown
      httpOptions) as unknown as Observable<
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
    return this.http.post(
      join(AUTH_API, "oauth/token"),
      new HttpParams({
        fromObject: {
          grant_type: "refresh_token",
          refresh_token: token
        }
      }),
      httpOptions
      // TS struggles with too many overload, hence this casting is needed to
      // unknown
    ) as unknown as ReturnType<AuthService["login"]>;
  }

  /**
   * Revokes the token.
   * @param token Token of the user
   */
  logout(token: string) {
    return this.http.post(
      join(AUTH_API, "oauth/revoke"),
      new HttpParams({fromObject: {
        token
      }}),
      httpOptions
      // TS struggles with too many overload, hence this casting is needed to
      // unknown
    ) as unknown as Observable<{status: 200} & HttpResponse<PostRevoke200> |
      {status: 403} & HttpResponse<PostRevoke403>>
  }

}
