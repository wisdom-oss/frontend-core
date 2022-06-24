import {Routes} from "@angular/router";

import {AuthGuard} from "./auth/auth.guard";
import {LoaderGuard} from "./frame/loader/loader.guard";

import * as modules from "../../../../modules";

/**
 * Class to provide data from the reexported wisdom modules.
 *
 * Reads its data from the workspace's "module.ts".
 */
export class ModuleProvider {

  /**
   * This class is a pure utility class and doesn't need constructing.
   * @private
   */
  private constructor() {}

  /**
   * Get the routes the wisdom modules want to be available at.
   */
  static routes(): Routes {
    let routes: Routes = [];
    for (let module of Object.values(modules)) {
      routes.push({
        path: module.wisdomInterface.path,
        children: [{path: "**", component: module.wisdomInterface.entryComponent}],
        component: module.wisdomInterface.entryComponent,
        canActivate: [AuthGuard, LoaderGuard]
      });
    }
    return routes;
  }

  /**
   * Get the translations from the wisdom modules given a language key.
   * @param lang The language key for the translations
   */
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
