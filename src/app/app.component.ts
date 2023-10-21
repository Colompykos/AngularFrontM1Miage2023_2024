import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-app';

  sidenavState:boolean=false;

  toggleSideNav(e:any):void{
        // console.log("clicked");
        this.sidenavState=!this.sidenavState;
        // console.log(this.sidenavState);
  }
}
