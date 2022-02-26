import {Component} from "@angular/core";

import {sidebar} from "../../../../../../sidebar";

/** The component displaying the sidebar. */
@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html"
})
export class SideBarComponent {

  /** Load the sidebar from the workspace. */
  sideBar = sidebar;

}
