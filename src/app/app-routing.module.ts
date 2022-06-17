import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {FrameComponent} from "./frame/frame.component";
import {ModuleProvider} from "./module-provider";
import {LoaderGuard} from "./frame/loader/loader.guard";

const routes: Routes = [
  {
    path: "",
    component: FrameComponent,
    canActivate: [AuthGuard, LoaderGuard],
    children: ModuleProvider.routes()
  },
  {path: "login", component: LoginComponent, canActivate: [LoaderGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
