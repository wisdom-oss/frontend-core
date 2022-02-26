import {Directive, Input, HostListener} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

/** Directive to set the currently displayed language. */
@Directive({
  selector: "[selectLang]"
})
export class LangSelectorDirective {

  /**
   * Constructor.
   * @param translateService Service to update the current language
   */
  constructor(private translateService: TranslateService) {}

  /** The language key that the translation service should use. */
  @Input("selectLang") lang: string | undefined;

  /**
   * Upon clicking on the element with this directive the lang of the
   * translation service updates with the given language key.
   */
  @HostListener("click")
  clickLangSelect() {
    if (!this.lang) return;
    this.translateService.use(this.lang);
    globalThis.localStorage.setItem("lang", this.lang);
  }

}
