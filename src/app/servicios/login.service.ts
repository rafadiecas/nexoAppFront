import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../modelos/Login';
import {Observable} from 'rxjs';

const apiUrl = '/api/auth';
@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de login.
 */
export class LoginService {

  constructor(private http: HttpClient) {
  }

  /**
   * Realiza el login.
   * @param login
   */
  login(login:Login): Observable<any> {
    return this.http.post(`${apiUrl}/login`, login);
  }

  /**
   * Comprueba si el usuario está logueado.
   */
  logueado(): boolean {
    let token = localStorage.getItem('token');
    return !!(token && token != '');
  }

  /**
   * Realiza el logout.
   */
  logOut(){
    localStorage.clear();
  }
}
