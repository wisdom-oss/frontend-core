import {isDevMode, Injector, NgModule} from "@angular/core";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {AuthModule} from "angular-auth-oidc-client";
import {WisdomModule} from "common";

import {CallbackComponent} from "./callback/callback.component";
import {authConfig} from "../../../../../wisdom.config";

@NgModule({
  imports: [AuthModule.forRoot({
    config: Object.assign({
      redirectUrl: window.location.origin + "/callback",
      postLogoutRedirectUri: window.location.origin,
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      autoUserInfo: true,
      renewUserInfoAfterTokenRenew: true,
      scope: "openid profile email offline_access avatar"
    }, authConfig)
  }), WisdomModule, TranslateModule],
  exports: [AuthModule],
  declarations: [
    CallbackComponent
  ]
})
export class AuthConfigModule {}
