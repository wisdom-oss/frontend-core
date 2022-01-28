import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {IonIconComponent} from "./ion-icon/ion-icon.component";
import {BaseUrlInterceptor} from "./base-url.interceptor";
import {FrameComponent} from "./frame/frame.component";
import {StaticLoader} from "./i18n/StaticLoader";
import {LangSelectorDirective} from "./i18n/lang-selector.directive";
import {
  BulmaIsToggleableDirective
} from "./util/bulma/bulma-is-toggleable.directive";

@NgModule({
  declarations: [
    AppComponent,
    IonIconComponent,
    LoginComponent,
    FrameComponent,
    BulmaIsToggleableDirective,
    LangSelectorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: globalThis.localStorage.getItem("lang") || "en_US",
      loader: {
        provide: TranslateLoader,
        useClass: StaticLoader
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
