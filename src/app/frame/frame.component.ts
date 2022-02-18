import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {AuthService} from "../auth/auth.service";
import {AuthStorageService} from "../auth/auth-storage.service";

// TODO: add further nesting - https://bulma.io/documentation/components/menu/

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
})
export class FrameComponent {

  constructor(
    private authService: AuthService,
    private authStorage: AuthStorageService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout(this.authStorage.accessToken!).subscribe(() => {
      this.authStorage.clear();
      this.router.navigate(["login"], {replaceUrl: true})
        .catch(e => console.error(e));
    });
  }

}
