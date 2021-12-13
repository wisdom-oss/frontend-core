import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonIconComponent } from './ion-icon/ion-icon.component';
import { LoginComponent } from './auth/login/login.component';
import {BaseUrlInterceptor} from "./base-url.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    IonIconComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    }],
  bootstrap: [LoginComponent]
})
export class AppModule { }
