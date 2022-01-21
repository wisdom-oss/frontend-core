import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

import {AuthService} from "../auth.service";
import {AuthStorageService} from "../auth-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private authStorage: AuthStorageService
  ) { }

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    const valid = f.valid;
    const {username, password} = f.value;
    this.authService.login(username, password).subscribe(response => {
      console.log(response);
      switch (response.status) {
        case 200:
          this.authStorage.accessToken = response.body?.access_token ?? null;
          this.authStorage.refreshToken = response.body?.refresh_token ?? null;
          this.authStorage.scopes = response.body?.scope ?? null;
          this.authStorage.expiresIn = response.body?.expires_in ?? null;
      }
    });
  }
}
