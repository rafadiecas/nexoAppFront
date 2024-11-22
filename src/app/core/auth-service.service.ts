import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
const apiUrl = '/api/usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {



  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // Método para guardar el token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para eliminar el token (logout)
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public obtenerRol(usuario: string | null): Observable<string> {
    return this.http.get(`${apiUrl}/rol/${usuario}`, { responseType: 'text' });
  }
}
