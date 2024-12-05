import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
const apiUrl = '/api/usuario';
@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que gestiona la autenticación de los usuarios
 */
export class AuthServiceService {



  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  /**
   * Método para guardar el token
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

/**
 * Método para obtener el token
 */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Método para borrar el token(logout)
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Método para obtener el rol del usuario
   */
  public obtenerRol(): Observable<string> {
    return this.http.get(`${apiUrl}/rol/`, { responseType: 'text' });
  }
}
