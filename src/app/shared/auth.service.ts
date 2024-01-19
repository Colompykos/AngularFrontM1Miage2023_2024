import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  form: FormGroup;

  url = "https://back-end-m1miage2023-2024-colompykos.onrender.com/api/"

  loggedIn = false;
  isAdmine = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  // users = [
  //   {username: 'admin', password: 'admin', role: 'admin'},
  //   {username: 'user', password: 'user', role: 'user'}
  // ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  login(user: { email: string; password: string }) {
    console.log(user);

    if (user.email === '' || user.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
      });
    } else if (!this.ValidateEmail(user.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email!',
      });
    } else {
      this.http
.post<any>(this.url + 'login', user, { 
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            Swal.fire('Success', "You're logged in", 'success');
            this.router.navigate(['/home']);

            this.getUserData().subscribe((userData) => {
              if (userData.isAdmin === 'true') {
                this.loggedIn = true;
                this.isAdmine = true;
                console.log('User is admin');
              } else {
                this.loggedIn = true;
                this.isAdmine = false;
                console.log('User is not admin');
              }
            });
          },
          (err) => {
            console.log(err);
            Swal.fire('Error', err.error.message, 'error');
            // Emitters.authEmitter.emit(false);
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

  SignOut() {
    // this.loggedIn = false;
    // this.isAdmine = false;
    this.http
      .post(this.url + 'logout', {}, { withCredentials: true }) // needs to be changed with the link of deployment
      .subscribe(() => {
        // Emitters.authEmitter.emit(false);
        this.loggedIn = false;
        this.isAdmine = false;
        console.log('User signed out');
      });

    this.router.navigate(['/login']);
  }

  IsAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isAdmine);
      });
    });
    return isUserAdmin;
  }

  ValidateEmail = (email: any) => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.match(emailRegex)) {
      return true;
    } else return false;
  };

  getUserData() {
    return this.http.get<any>(this.url + 'user', {
      withCredentials: true,
    });
  }

  checkauth() {
    this.http
      .get(this.url + 'checkAuth', { withCredentials: true })
      .subscribe((response: any) => {
        this.loggedIn = response.loggedIn;
        if (response.isAdmin === 'true') {
          this.isAdmine = true;
        } else {
          this.isAdmine = false;
        }
        console.log(this.loggedIn);
        console.log(this.isAdmine);
      });
  }

  register(user: { name:string ; email: string; password: string; isAdmin:string }){

    console.log(user);

    if(user.name==""|| user.email=="" || user.password=="" || user.isAdmin === ""){
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
      this.http.post(this.url + "register",user,{
        withCredentials:true
      })
      .subscribe(()=>{
        this.router.navigate(["/home"]);
        Swal.fire("Success", "User created", "success");
        this.getUserData().subscribe((userData) => {
          if (userData.isAdmin === 'true') {
            this.loggedIn = true;
            this.isAdmine = true;
            console.log('User is admin');
          } else {
            this.loggedIn = true;
            this.isAdmine = false;
            console.log('User is not admin');
          }
        });
      }, (err) => {
        Swal.fire("Error", err.error.emailState, "error");
      });
    }
  }
}
