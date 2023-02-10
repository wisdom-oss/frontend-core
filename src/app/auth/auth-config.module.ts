import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { authConfig } from "../../../../../auth";

@NgModule({
    imports: [AuthModule.forRoot({
        config: Object.assign({
              redirectUrl: window.location.origin,
              postLogoutRedirectUri: window.location.origin,
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30
          }, authConfig)
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
