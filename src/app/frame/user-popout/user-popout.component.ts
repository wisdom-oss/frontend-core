import { Component, OnInit, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { OidcSecurityService } from "angular-auth-oidc-client";


@Component({
  selector: "app-user-popout",
  templateUrl: "./user-popout.component.html",
})
export class UserPopoutComponent implements OnInit {
  name: string = "Name";
  username: string = "@username";
  avatar: string = "";
  isAdmin: boolean = false;

  constructor(
    public elementRef: ElementRef,
    public oidcSecurityService: OidcSecurityService,
  ) { }

  ngOnInit(): void {
    this.oidcSecurityService.getUserData().subscribe((userData) => {
      console.log(userData);
      this.username = "@" + userData.preferred_username;
      this.name = userData.name;
      this.avatar =  userData.picture !== undefined ? userData.picture : this.generateFallbackImage(this.name);
    });
  }

  /**
   * This function generates a fallback user avatar image which contains the
   * initials of the users full name.
   * 
   * @returns A data Url containing the image
   */
  generateFallbackImage(name: string): string {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    if (!context) {
      return "";
    }

    let text =  "";
    let parts = name.split(" ");
    parts.forEach((part) => {text += part.slice(0,1)})

    let textSize = 100 - (100 / parts.length);
    console.log(textSize)


    canvas.width = 200;
    canvas.height = 200;

    context.fillStyle = "#a09c95";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = "bold " + textSize + "px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png")
  }

  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }

  toggle(): void {
    this.elementRef.nativeElement
      .querySelector(".dropdown")
      .classList.toggle("is-active");
  }
}
