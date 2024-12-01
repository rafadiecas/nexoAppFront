import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {request} from 'express';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {AuthServiceService} from '../auth-service.service';

/**
 * Interceptor que añade el token de autenticación a las peticiones HTTP
 * @param request
 * @param next
 */
export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  console.log(request.url);
  const authService = inject(AuthServiceService);
  const token = authService.getToken();
  if (token) {
    request = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`,
      }
    });
  }
  return next(request);
}


