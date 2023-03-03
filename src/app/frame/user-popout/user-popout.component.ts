import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {TranslateService} from "@ngx-translate/core";
import {AuthentikService} from "../../auth/authentik/authentik.service";

@Component({
  selector: 'app-user-popout',
  templateUrl: './user-popout.component.html'
})
export class UserPopoutComponent implements OnInit {

  name: string = "Name";
  username: string = "@username";
  avatar: string = "";
  isAdmin: boolean = false;

  constructor(
    public oidcSecurityService: OidcSecurityService,
    public authentik: AuthentikService
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService.getUserData().subscribe(userData => {
      this.authentik.core.users.me().subscribe(userData => {
        this.username = "@" + userData.user.username;
        this.name = userData.user.name;
        this.avatar = userData.user.avatar;
        this.isAdmin = userData.user.is_superuser;
      });
    });
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe(result => console.log(result));
  }

}
