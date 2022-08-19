import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {join} from "@angular/compiler-cli";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import GetUsers200 from "./response_types/users/GetUsers200";
import PutUsers201 from "./response_types/users/PutUsers201";
import PutUsers409 from "./response_types/users/PutUsers409";

// FIXME: this url is incorrect and the base needs to be moved
/** Url for the interaction. */
const AUTH_API = "localhost:8090/auth/";

/** Options passed into the get requests. */
const getOptions: Parameters<HttpClient["get"]>[1] = {
  responseType: "json"
}

// FIXME: this is currently pretty wrong in the implementation

/** Service to interact with the user management of the auth server. */
@Injectable({
  providedIn: "root"
})
export class UserService {

  /**
   * Constructor.
   * @param http Service to interact with the server via http
   */
  constructor(private http: HttpClient) {}

  /**
   * Helper function to generate the http options necessary for all requests.
   * @private
   */
  private static httpOptions(): Parameters<HttpClient["get"]>[1] {
    return {
      responseType: "json",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    }
  }

  /** Get all user accounts currently in the database. */
  getUsers() {
    return this.http.get(join(AUTH_API, "users"), UserService.httpOptions()) as
      Observable<{status: 200} & HttpResponse<GetUsers200>>;
  }

  /**
   * Create a new user account
   *
   * This will create a new user account.
   * During the creation a user account must not use the same username
   * (login name).
   * All other properties may be not unique.
   *
   * @param firstName First name(s) of the person associated to the account
   * @param lastName Last name(s) of the person associated to the account
   * @param username Username for the login
   * @param password The initial account password for this user
   * @param scopes The scopes the user may use as OAuth2.0 scope string
   * @param roles List of Role names which the user shall be associated with
   */
  createUser(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    scopes?: string,
    roles?: number[]
  ) {
    const body: any = {
      firstName, lastName, username, password
    };
    if (scopes) body.scopes = scopes;
    if (roles) body.roles = roles;

    return this.http.put(
      join(AUTH_API, "users"),
      body,
      UserService.httpOptions()
    ) as Observable<
      {status: 201} & HttpResponse<PutUsers201> |
      {status: 409} & HttpResponse<PutUsers409>
    >;
  }
}
