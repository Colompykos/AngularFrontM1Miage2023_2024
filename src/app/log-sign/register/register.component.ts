import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form:FormGroup

  constructor( private formBuilder:FormBuilder, private http:HttpClient, private router:Router){

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
    let user = this.form.getRawValue()

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
      this.http.post("http://localhost:8010/api/register",user,{
        withCredentials:true
      })
      .subscribe(()=>{
        this.router.navigate(["/login"]);
        Swal.fire("Success", "User created", "success");
      }, (err) => {
        Swal.fire("Error", err.error.emailState, "error");
      });
    }
    
  }

  ValidateEmail = (email:any) =>{
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.match(emailRegex)){
      return true;
    }else
      return false;
  }

}
