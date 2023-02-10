import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

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
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
