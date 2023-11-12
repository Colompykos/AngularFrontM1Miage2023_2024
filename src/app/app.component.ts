import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';
import { AssignmentsService } from './shared/assignments.service';
import { Assignment } from './assignments/assignment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService:AuthService,private router:Router,private assignmentService:AssignmentsService){}

  title = 'Assignment-App';
  assignments!: Assignment[];
  sidenavState:boolean=false;

  ngOnInit(): void {
    //this.assignments = this.assignmentService.getAssignments();
    this.getAssignments();
  }
  getAssignments(){
    this.assignmentService.getAssignments().subscribe((assignments) => { this.assignments = assignments});
  }
  

  toggleSideNav(e:any):void{
        // console.log("clicked");
        this.sidenavState=!this.sidenavState;
        // console.log(this.sidenavState);
  }

  getLog(){
    this.router.navigate(["/log"])
  }

  getHome(){
    this.router.navigate(["/home"])
  }

  // login(){
  //   if (this.authservice.loggedIn){
  //     this.authservice.SignOut();
  //     this.router.navigate(['/home'])
  //   }
  //   else{
  //     this.authservice.LogIn();
  //   }
  // }

  LogOut(){

    this.authService.loggedIn = false
    this.authService.isAdmin=false

    this.router.navigate(['/log']);
  
  }
}
