import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AuthGuard} from "./auth/auth.guard";
import {FrameComponent} from "./frame/frame.component";
import {ModuleProvider} from "./module-provider";
import {LoaderGuard} from "./frame/loader/loader.guard";
import {CallbackComponent} from "./auth/callback/callback.component";
import {AutoLoginPartialRoutesGuard} from "angular-auth-oidc-client";

const routes: Routes = [
  {
    path: "",
    component: FrameComponent,
    canActivate: [AutoLoginPartialRoutesGuard, LoaderGuard],
    children: ModuleProvider.routes()
  },

  // does nothing but setting up auth
  {path: "callback", component: CallbackComponent},

  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
