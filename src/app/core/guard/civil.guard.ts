import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { catchError, map, of } from 'rxjs';

export const civilGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const isLogged: boolean = !!localStorage.getItem('token');

  return authService.obtenerRol().pipe(
    map((role: any) => {
      const isAuthorized = isLogged && role === 'CIVIL';
      if (!isAuthorized) {
        router.navigate(['']);
        return false;
      }
      return true;
    }),
    catchError((error) => {
      router.navigate(['']);
      console.log('Error:', error);
      return of(false);
    })
  );
};
