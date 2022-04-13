import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {

  isLoading = true;

  ngAfterViewInit(): void {
    setTimeout(() => this.isLoading = false, 5000);
  }



}
