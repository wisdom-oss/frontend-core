import {Directive, Input, HostListener} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Directive({
  selector: '[selectLang]'
})
export class LangSelectorDirective {

  constructor(private translateService: TranslateService) {}

  @Input("selectLang")
  lang: string | undefined;

  @HostListener("click")
  clickLangSelect() {
    if (!this.lang) return;
    this.translateService.use(this.lang);
    globalThis.localStorage.setItem("lang", this.lang);
  }

}
