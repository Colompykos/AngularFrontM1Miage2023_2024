import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { LoggingService } from 'src/app/shared/logging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(public authService: AuthService, public loggingService: LoggingService) {}

  onSubmit() {
    this.authService.logIn(this.username, this.password);
  }

  edit() {
    if (this.authService.IsAdmin()) {
      // to modify
    }
  }
  
  delete() {
    if (this.authService.IsAdmin()) {
      // to delete
    }
  }

}
