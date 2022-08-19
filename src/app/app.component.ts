import {Component, OnInit} from "@angular/core";
import {Chart} from "chart.js";
import AnnotationPlugin from "chartjs-plugin-annotation";
import {Icon} from "leaflet";

/** Component of the app, the main entry point for angular. */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  /** The title of the website. */
  title = "WISdoM-OSS";

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
