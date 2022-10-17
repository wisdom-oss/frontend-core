import {Component, OnInit, AfterViewInit} from "@angular/core";

import {LoaderService} from "./loader.service";

/**
 * Component covering the main container with a loading screen while we wait for
 * services to respond.
 *
 * This will display an animation and possibly some loading texts.
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  /**
   * Constructor.
   * @param service Service to handle communication efforts
   */
  constructor(private service: LoaderService) {}

  /** Whether the loader should be active. */
  isLoading = false;
  /** The texts to display while loading. */
  displayTexts: string[] = [];

  /**
   * On init this should subscribe to the service in order to update the loading
   * screen.
   */
  ngOnInit(): void {
    this.service.loading.subscribe(value => this.isLoading = value);
    this.service.displayTexts.subscribe(
      // this dedupes loader texts
      values => this.displayTexts = [...new Set(values)]
    );
  }
}
