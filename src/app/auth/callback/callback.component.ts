import {Component, OnInit} from "@angular/core";
import {OidcSecurityService} from "angular-auth-oidc-client";

import * as wisdomConfig from "../../../../../../wisdom.config";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  name = wisdomConfig.name;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe();
  }

}
