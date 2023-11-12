import { CanActivateFn, Router } from '@angular/router';
import { AssignmentsService } from './assignments.service';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router =inject(Router);

  return authService.isAdmin().then(
    (authentifie:boolean) => {
      if (authentifie) {
        console.log('"Vous êtes AddAssignmentComponent, navigation autorisée!"');
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    }
  );  

  
};
