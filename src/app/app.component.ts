import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authservice:AuthService,private router:Router){}

  title = 'Assignment-App';

  sidenavState:boolean=false;

  toggleSideNav(e:any):void{
        // console.log("clicked");
        this.sidenavState=!this.sidenavState;
        // console.log(this.sidenavState);
  }

  login(){
    if (this.authservice.loggedIn){
      this.authservice.SignOut();
      this.router.navigate(['/home'])
    }
    else{
      this.authservice.LogIn();
    }
  }
}
