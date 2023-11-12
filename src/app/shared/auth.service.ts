import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn=false;
  isAdmin = false;

  users = [
    {username: 'admin', password: 'admin', role: 'admin'},
    {username: 'user', password: 'user', role: 'user'}
  ];

  constructor(private router:Router) { }

  logIn(username: string, password: string) {

    const user = this.users.find(u => u.username === username && u.password === password);
    //if (user) {
      if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      this.isAdmin = true;
      } else if (username === 'user' && password === 'user') {
      this.loggedIn = true;
      this.isAdmin = false;
      }

      console.log(`User ${username} is connected as  ${this.isAdmin ? 'admin' : 'utilisateur'}.`);
      console.log('IsAdmin : ' + this.isAdmin);
      console.log('IsLoggedIn : ' + this.loggedIn);
      this.router.navigate(['/home']);
  
    }

  SignOut(){
    this.loggedIn = false;
    this.isAdmin = false;
  }

  IsAdmin(){
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.isAdmin);
          },
        );
      }
    );
    return isUserAdmin;
  }

}
