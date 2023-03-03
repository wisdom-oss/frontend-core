import {Component, OnInit} from "@angular/core";
import {Chart} from "chart.js";
import AnnotationPlugin from "chartjs-plugin-annotation";
import {Icon} from "leaflet";
import {OidcSecurityService} from "angular-auth-oidc-client";

/** Component of the app, the main entry point for angular. */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  /** The title of the website. */
  title = "WISdoM-OSS";

  constructor(public oidcSecurityService: OidcSecurityService) {}

  /**
   * On init this sets the Default image path for Leaflet.
   *
   * This also registers the {@link AnnotationPlugin} for chart.js.
   */
  ngOnInit(): void {
    Icon.Default.imagePath = "assets/leaflet/images/";
    Chart.register(AnnotationPlugin);
    this.oidcSecurityService.checkAuth().subscribe();
  }
}
