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

const getOptions: Parameters<HttpClient["get"]>[1] = {
  responseType: "json"
}

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private http: HttpClient) {}

  private static httpOptions(): Parameters<HttpClient["get"]>[1] {
    return {
      responseType: "json",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    }
  }

  getUsers() {
    return this.http.get(join(AUTH_API, "users"), UserService.httpOptions()) as
      Observable<{status: 200} & HttpResponse<GetUsers200>>;
  }

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
