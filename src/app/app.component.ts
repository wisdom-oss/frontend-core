import {Component, OnInit} from "@angular/core";
import {Chart} from "chart.js";
import AnnotationPlugin from "chartjs-plugin-annotation";

/** Component of the app, the main entry point for angular. */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  /** The title of the website. */
  title = "WISdoM-OSS";

  ngOnInit(): void {
    Chart.register(AnnotationPlugin);
  }
}
