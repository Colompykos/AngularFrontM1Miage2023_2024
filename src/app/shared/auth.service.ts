// auth.service.ts
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  login(user: { email: string; password: string }) {
    if (user.email === '' || user.password === '') {
      this.toastr.error('Please fill all the fields!', 'Oops...');
    } else if (!this.ValidateEmail(user.email)) {
      this.toastr.error('Please enter a valid email!', 'Oops...');
    } else {
      this.http
        .post<any>(this.url + 'login', user, { 
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            this.toastr.success("You're logged in", 'Success');
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

            const token = res.token;

            // Store the token in local storage
            localStorage.setItem('jwtToken', token);
          },
          (err) => {
            console.log(err);
            this.toastr.error(err.error.message, 'Error');
          }
        );
    }
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

  register(user: { name: string; email: string; password: string; isAdmin: string }) {
    if (user.name === "" || user.email === "" || user.password === "" || user.isAdmin === "") {
      this.toastr.error('Please fill all the fields!', 'Oops...');
    }
    else if (!this.ValidateEmail(user.email)) {
      this.toastr.error('Please enter a valid email!', 'Oops...');
    }
    else {
      this.http.post<any>(this.url + "register", user, {
        withCredentials: true
      })
        .subscribe((res) => {
          this.router.navigate(["/home"]);
          this.toastr.success("User created", "Success");

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

          const token = res.token;
          // Store the token in local storage
          localStorage.setItem('jwtToken', token);
        }, (err) => {
          this.toastr.error(err.error.emailState, "Error");
        });
    }
  }

  SignOut() {
    this.http
      .post(this.url + 'logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.loggedIn = false;
        this.isAdmine = false;
        console.log('User signed out');
      });

    // Remove the token from local storage on logout
    localStorage.removeItem('jwtToken');
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=None;";

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
}
