import {Component, OnInit, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

/** Basic error component to display error codes on the full screen. */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  /** The code to display. */
  code: number = NaN;
  /** The message under the code. */
  message?: string;

  /**
   * Constructor.
   * @param route The current route
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * On init this subscribes to the params and the query params to display a
   * correct message on the screen.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
    });
    this.route.queryParams.subscribe(({message}) => {
      this.message = message;
    });
  }

}
