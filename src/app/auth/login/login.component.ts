import { Component, OnInit } from '@angular/core';
import {AuthStorageService} from "../auth-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug'
})
export class LoginComponent implements OnInit {

  constructor(private authStorage: AuthStorageService) { }

  ngOnInit(): void {}


}
