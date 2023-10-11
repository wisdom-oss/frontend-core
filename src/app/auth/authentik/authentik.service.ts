import {HttpClient, HttpContext, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {SEND_AUTH} from "common";
import {Observable} from "rxjs";

import {core} from "./types";
import {authConfig} from "../../../../../../wisdom.config";

const API_URL = authConfig.authority.split("/application/o/")[0] + "/api/v3/";

/**
 * Service to interact with some Authentik APIs.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthentikService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  core = {
    users: {
      me: ((): Observable<core.users.me> => {
        return this.http.get(API_URL + "core/users/me/", {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          }),
          responseType: "json",
          context: new HttpContext()
            .set(SEND_AUTH, true)
        }) as Observable<core.users.me>;
      }).bind(this)
    }
  }
}
