import {NgModule, isDevMode, Injector} from '@angular/core';
import {AuthModule} from 'angular-auth-oidc-client';
import {authConfig} from "../../../../../auth";
import {CallbackComponent} from './callback/callback.component';
import {Router} from "@angular/router";
import {WisdomModule} from "common";
import {TranslateModule} from "@ngx-translate/core";

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
      scope: "openid profile email goauthentik.io/api"
    }, authConfig)
  }), WisdomModule, TranslateModule],
  exports: [AuthModule],
  declarations: [
    CallbackComponent
  ]
})
export class AuthConfigModule {}
