import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router =inject(Router);

  return authService.IsAdmin().then((isAuth) => {
    if (isAuth) {
      console.log('Vous êtes admin, vous pouvez naviguer');
      return true;
    } else {
      console.log("Vous n'êtes pas admin, vous ne pouvez pas naviguer");
      router.navigate(['/home']);
      return false;
    }
  })
};
