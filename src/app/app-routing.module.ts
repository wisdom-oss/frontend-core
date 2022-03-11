import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {FrameComponent} from "./frame/frame.component";
import {ModuleProvider} from "./module-provider";
import {ErrorComponent} from "./error/error.component";

ModuleProvider.routes();

const routes: Routes = [
  {
    path: "",
    component: FrameComponent,
    canActivate: [AuthGuard],
    children: ModuleProvider.routes()
  },
  {path: "login", component: LoginComponent},
  {path: "error/:code", component: ErrorComponent},
  {path: "**", redirectTo: "error/404?message=Not%20Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
