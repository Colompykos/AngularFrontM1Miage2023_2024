import { AuthService } from './../../shared/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup

  constructor( private formBuilder:FormBuilder , private authService:AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  onSubmit(){
    this.authService.login(this.form.getRawValue());
  }


}
