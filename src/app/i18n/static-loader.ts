import {TranslateLoader} from "@ngx-translate/core";
import {of, Observable} from "rxjs";

import de_DELang from "./langs/de_DE";
import en_USLang from "./langs/en_US";
import {de_DELang as de_DELangCommon, en_USLang as en_USLangCommon} from "common";
import {ModuleProvider} from "../module-provider";
import {langs as sideBarLangs} from "../../../../../sidebar";

/** The languages the loader provides. */
let langs: any = {
  de_DE: Object.assign({}, de_DELang, de_DELangCommon, ModuleProvider.langs("de_DE")),
  en_US: Object.assign({}, en_USLang, en_USLangCommon, ModuleProvider.langs("en_US"))
}

for (let [lang, values] of Object.entries(sideBarLangs)) {
  langs[lang as "de_DE" | "en_US"].sidebar = {};
  for (let [key, value] of Object.entries(values)) {
    langs[lang as "de_DE" | "en_US"].sidebar[key] = value;
  }
}

/**
 * The loader for the translations.
 * Since all translations are available from the start this one is rather simple.
 */
export class StaticLoader implements TranslateLoader {

  /**
   * Get the translations for a specific language key.
   * @param lang The language key
   */
  getTranslation(lang: string): Observable<any> {
    // @ts-ignore
    return of(langs[lang]);
  }
}
