import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {FrameComponent} from "./frame/frame.component";

const routes: Routes = [
  {
    path: "",
    component: FrameComponent,
    canActivate: [AuthGuard],
    //children: ModuleProvider.provideRoutes()
  },
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
