import { AuthService } from './../../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form:FormGroup

  constructor( private formBuilder:FormBuilder, private http:HttpClient, private router:Router, private authService:AuthService){

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:'',
      email: '',
      password: '',
      isAdmin: ''
    })
  }

  onSubmit():void{
    this.authService.register(this.form.getRawValue())
  }

  ValidateEmail = (email:any) =>{
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.match(emailRegex)){
      return true;
    }else
      return false;
  }

}
