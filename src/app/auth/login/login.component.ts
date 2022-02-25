import {ViewChild, Component, OnInit, ElementRef} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../auth.service";
import {AuthStorageService} from "../auth-storage.service";
import PostOAuthToken400 from "../response_types/login/PostOAuthToken400";
import PostOAuthToken401 from "../response_types/login/PostOAuthToken401";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  @ViewChild("passwordInput")
  passwordInput!: ElementRef<HTMLInputElement>;

  loginHasIssue: false | string = false;

  constructor(
    private authService: AuthService,
    private authStorage: AuthStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    const valid = f.valid;
    const {username, password} = f.value;
    this.authService.login(username, password).subscribe({
      next: response => {
        this.authStorage.accessToken = response.access_token;
        this.authStorage.refreshToken = response.refresh_token;
        this.authStorage.scopes = response.scope;
        this.authStorage.expiresIn = response.expires_in;
        console.log("successfully logged in");
        this.router.navigate([""], {replaceUrl: true}).catch(e => console.error(e));
      },
      error: errResponse => {
        let error;
        switch (errResponse.status) {
          case 400:
            error = errResponse.error as PostOAuthToken400;
            console.error(error);
            this.loginHasIssue = "Kombination is nicht korrekt.";
            this.passwordInput?.nativeElement.select();
            break;
          case 401:
            error = errResponse.error as PostOAuthToken401;
            console.error(error);
            throw errResponse;
          default:
            throw errResponse;
        }
      }
    });
  }
}
