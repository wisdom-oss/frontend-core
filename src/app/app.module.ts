import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {WisdomModule} from "common";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {BaseUrlInterceptor} from "./base-url.interceptor";
import {ErrorComponent} from "./error/error.component";
import {FrameComponent} from "./frame/frame.component";
import {SideBarComponent} from "./frame/side-bar/side-bar.component";
import {LangSelectorDirective} from "./i18n/lang-selector.directive";
import {StaticLoader} from "./i18n/static-loader";
import {CacheInterceptor} from "./cache.interceptor";
import { LoaderComponent } from './frame/loader/loader.component';
import {LoaderInterceptor} from "./frame/loader/loader.interceptor";
import {SanitizeUrlInterceptor} from "./sanitize-url.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FrameComponent,
    LangSelectorDirective,
    SideBarComponent,
    ErrorComponent,
    LoaderComponent
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
    })
  ],
  providers: [
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SanitizeUrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
