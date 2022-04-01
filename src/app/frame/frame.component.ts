import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {AuthService} from "../auth/auth.service";
import {AuthStorageService} from "../auth/auth-storage.service";
import {SettingsStorageService} from "../settings-storage.service";

// TODO: add further nesting - https://bulma.io/documentation/components/menu/

/**
 * Component framing the application.
 *
 * Every site except the login page will display this frame.
 */
@Component({
  selector: "app-frame",
  templateUrl: "./frame.component.html"
})
export class FrameComponent {

  /**
   * Constructor.
   * @param authService Service to interact with the auth server
   * @param authStorage Storage of the keys for revoking
   * @param router Router to route the user on logout
   * @param settingsStorage Storage of the settings
   */
  constructor(
    private authService: AuthService,
    private authStorage: AuthStorageService,
    private router: Router,
    private settingsStorage: SettingsStorageService
  ) {}

  /** Get hide sidebar setting. */
  get hideSidebar() {
    return this.settingsStorage.hideSidebar || false;
  }
  /** Set hide sidebar setting. */
  set hideSidebar(setting: boolean) {
    this.settingsStorage.hideSidebar = setting;
  }

  /** Get hide user bar setting. */
  get hideUserBar() {
    return this.settingsStorage.hideUserBar || false;
  }
  /** Set hide user bar setting. */
  set hideUserBar(setting: boolean) {
    this.settingsStorage.hideUserBar = setting;
  }

  /** Log the user out and bring the user to the login page. */
  logout() {
    this.authService.logout(this.authStorage.accessToken!).subscribe(() => {
      this.authStorage.clear();
      this.router.navigate(["login"], {replaceUrl: true})
        .catch(e => console.error(e));
    });
  }

}
