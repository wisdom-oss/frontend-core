import {Routes} from "@angular/router";

import * as modules from "../../../../modules";

export class ModuleProvider {

  private constructor() {}

  static routes(): Routes {
    let routes: Routes = [];
    for (let module of Object.values(modules)) {
      routes.push({
        path: module.wisdomInterface.path,
        component: module.wisdomInterface.entryComponent,
      });
    }
    return routes;
  }

  static langs(lang: string) {
    let collectedLang = {};
    for (let module of Object.values(modules)) {
      let moduleLang = module.wisdomInterface.translations[lang];
      if (moduleLang) {
        Object.assign(collectedLang, moduleLang);
      }
    }
    return collectedLang;
  }

}
