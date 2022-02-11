import {wisdomInterface as exampleWInterface} from "@wisdom-frontend/example";
import {Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";

export class ModuleProvider {
  static provideRoutes(): Routes {
    let routes = [];
    for (let {path, entryComponent} of [exampleWInterface]) {
      routes.push({path, component: entryComponent, canActivate: [AuthGuard]});
    }
    console.log(routes);
    return routes;
  }
}
