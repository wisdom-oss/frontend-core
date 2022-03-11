import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {AuthService} from "../auth/auth.service";
import {AuthStorageService} from "../auth/auth-storage.service";

// TODO: add further nesting - https://bulma.io/documentation/components/menu/

/**
 * Component framing the application.
 *
 * Every site except the login page will display this frame.
 */
@Component({
  selector: "app-frame",
  templateUrl: "./frame.component.html",
})
export class FrameComponent {

  /** Boolean value if the left sidebar should be hidden. */
  hideSidebar: boolean = false;
  /** Boolean value if the right sidebar should be hidden. */
  hideUserBar: boolean = false;

  /**
   * Constructor.
   * @param authService Service to interact with the auth server
   * @param authStorage Storage of the keys for revoking
   * @param router Router to route the user on logout
   */
  constructor(
    private authService: AuthService,
    private authStorage: AuthStorageService,
    private router: Router
  ) { }

  /** Log the user out and bring the user to the login page. */
  logout() {
    this.authService.logout(this.authStorage.accessToken!).subscribe(() => {
      this.authStorage.clear();
      this.router.navigate(["login"], {replaceUrl: true})
        .catch(e => console.error(e));
    });
  }

}
