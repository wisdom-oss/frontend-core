import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {AuthStorageService} from "../auth/auth-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.pug',
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
