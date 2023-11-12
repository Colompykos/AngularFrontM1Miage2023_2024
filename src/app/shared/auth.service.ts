import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn=false;

  LogIn(){
    this.loggedIn=true;
  }

  SignOut(){
    this.loggedIn=false;
  }

  isAdmin(){
    const isUserAdmin= new Promise(
      (resolve,reject)=> resolve(this.loggedIn)
      );

      return isUserAdmin

  }

  constructor() { }
}
