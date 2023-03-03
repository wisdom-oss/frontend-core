import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {WisdomModule} from "common";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {BaseUrlInterceptor} from "./base-url.interceptor";
import {ErrorComponent} from "./frame/error/error.component";
import {FrameComponent} from "./frame/frame.component";
import {SideBarComponent} from "./frame/side-bar/side-bar.component";
import {LangSelectorDirective} from "./i18n/lang-selector.directive";
import {StaticLoader} from "./i18n/static-loader";
import {CacheInterceptor} from "./cache.interceptor";
import {LoaderComponent} from "./frame/loader/loader.component";
import {LoaderInterceptor} from "./frame/loader/loader.interceptor";
import {ErrorInterceptor} from "./frame/error/error.interceptor";
import { AuthConfigModule } from './auth/auth-config.module';
import { UserPopoutComponent } from './frame/user-popout/user-popout.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    LangSelectorDirective,
    SideBarComponent,
    ErrorComponent,
    LoaderComponent,
    UserPopoutComponent
  ],
  imports: [
    WisdomModule,
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
    }),
    AuthConfigModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
