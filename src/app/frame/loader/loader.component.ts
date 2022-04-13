import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoaderService} from "./loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private service: LoaderService) {}

  isLoading = false;

  ngOnInit(): void {
    this.service.loading.subscribe(value => this.isLoading = value);
  }

}
