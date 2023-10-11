import {Component, OnInit, HostListener} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Chart} from "chart.js";
import AnnotationPlugin from "chartjs-plugin-annotation";
import {Icon} from "leaflet";

import * as wisdomConfig from "../../../../wisdom.config";

/** Component of the app, the main entry point for angular. */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  /** The title of the website. */
  title = "WISdoM-OSS";

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private titleService: Title
  ) {
    this.titleService.setTitle(wisdomConfig.name);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    let srcElement = event.srcElement as HTMLElement;
    hideAutoHideElement(
      document.getElementsByTagName("body")[0],
      srcElement
    );
  }

  /**
   * On init this sets the Default image path for Leaflet.
   *
   * This also registers the {@link AnnotationPlugin} for chart.js.
   */
  ngOnInit(): void {
    Icon.Default.imagePath = "assets/leaflet/images/";
    Chart.register(AnnotationPlugin);
  }
}

function hideAutoHideElement(element: HTMLElement, except: HTMLElement) {
  if (!element.contains(except) && element.classList.contains("is-auto-hide")) {
    element.classList.remove("is-active");
  }
  for (let child of (element as any)?.children) {
    hideAutoHideElement(child, except);
  }
}
