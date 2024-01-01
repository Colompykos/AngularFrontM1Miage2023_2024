import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Emitters } from '../emitters/emitter';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  form:FormGroup

  loggedIn=false;
  isAdmine = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  // users = [
  //   {username: 'admin', password: 'admin', role: 'admin'},
  //   {username: 'user', password: 'user', role: 'user'}
  // ];

  constructor(private router:Router, private http:HttpClient, private formBuilder:FormBuilder) { }

  login(user: { email: string; password: string }){

    console.log(user);

    if(user.email ==="" || user.password===""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
      })
    }
    else if(!this.ValidateEmail(user.email)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email!',
      })
    }
    else{
      this.http.post<any>("http://localhost:8010/api/login", user, {
      withCredentials: true
    }).subscribe(
      (res) => {
        Swal.fire("Success", "You're logged in", "success");
        this.router.navigate(["/home"]);
        Emitters.authEmitter.emit(true);

        this.getUserData().subscribe((userData)=>{
          if (userData.isAdmin === "true") {
            this.loggedIn = true;
            this.isAdmine = true;
            console.log('User is admin');
          }else{
            this.loggedIn = true;
            this.isAdmine = false;
            console.log('User is not admin');
          }
        })
      },
      (err) => {
        console.log(err);
        Swal.fire("Error", err.error.message, "error");
        Emitters.authEmitter.emit(false);
      }
    );
    }
  }

  // logIn(username: string, password: string) {

  //   const user = this.users.find(u => u.username === username && u.password === password);
  //   //if (user) {
  //     if (username === 'admin' && password === 'admin') {
  //     this.loggedIn = true;
  //     this.isAdmin = true;
  //     } else if (username === 'user' && password === 'user') {
  //     this.loggedIn = true;
  //     this.isAdmin = false;
  //     }

  //     console.log(`User ${username} is connected as  ${this.isAdmin ? 'admin' : 'utilisateur'}.`);
  //     console.log('IsAdmin : ' + this.isAdmin);
  //     console.log('IsLoggedIn : ' + this.loggedIn);
  //     this.router.navigate(['/home']);
  
  //   }

  SignOut(){
    // this.loggedIn = false;
    // this.isAdmine = false;
    this.http.post('http://localhost:8010/api/logout',{},{withCredentials:true})
    .subscribe(()=> {
      Emitters.authEmitter.emit(false);
      this.loggedIn = false;
      this.isAdmine = false;
      console.log("User signed out");

    })

    this.router.navigate(['/login']);
  }

   IsAdmin(){
     const isUserAdmin = new Promise(
       (resolve, reject) => {
         setTimeout(
           () => {
                resolve(this.isAdmine);
           },
         );
       }
     );
     return isUserAdmin;
   }

  ValidateEmail = (email:any) =>{
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.match(emailRegex)){
      return true;
    }else
      return false;
  }

  getUserData() {
    return this.http.get<any>('http://localhost:8010/api/user', { withCredentials: true });
  }

}
