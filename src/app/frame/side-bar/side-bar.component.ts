import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {sidebar} from "../../../../../../sidebar";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html"
})
export class SideBarComponent implements OnInit {

  sideBar = sidebar;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

}
