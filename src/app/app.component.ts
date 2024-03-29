import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from './shared/assignments.service';
import { Assignment } from './assignments/assignment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public authService:AuthService,private router:Router,private assignmentService:AssignmentsService, private http:HttpClient){}

  title = 'Assignment-App';
  assignments!: Assignment[];
  sidenavState:boolean=false;
  name: string = ''

  ngOnInit(): void {
    //this.assignments = this.assignmentService.getAssignments();
    setTimeout(() => {
      this.authService.checkauth();
    }, 0);
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
    this.router.navigate(["/register"])
  }

  getHome(){
    this.router.navigate(["/home"])
  }

  LogOut():void{

    this.authService.SignOut();
    // this.authenticated=false
  }
}
