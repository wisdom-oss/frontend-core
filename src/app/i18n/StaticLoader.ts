import {TranslateLoader} from "@ngx-translate/core";
import {of, Observable} from "rxjs";

import de_DELang from "./langs/de_DE";
import en_USLang from "./langs/en_US";
import {ModuleProvider} from "../module-provider";

let langs = {
  de_DE: Object.assign({}, de_DELang, ModuleProvider.langs("de_DE")),
  en_US: Object.assign({}, en_USLang, ModuleProvider.langs("en_US"))
}

/*
I used a lot of ts ignore statements.
This will be replaced with a better loader.
*/

// TODO: do a better loader than this, but this will come,
//  when modules are ready

export class StaticLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // @ts-ignore
    return of(langs[lang]);
  }
}
