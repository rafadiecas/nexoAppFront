import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthServiceService} from '../auth-service.service';
import {catchError, map, of} from 'rxjs';

/**
 * Guardia que comprueba si el usuario es autoridad
 * @param route
 * @param state
 */
export const autoridadGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const isLogged: boolean = !!localStorage.getItem('token');

  return authService.obtenerRol().pipe(
    map((role: any) => {
      const isAuthorized = isLogged && role === 'AUTORIDAD';
      if (!isAuthorized) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    catchError((error) => {
      router.navigate(['/login']);
      console.log('Error:', error);
      return of(false);
    })
  );
};
