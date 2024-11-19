import { Injectable } from '@angular/core';
import {CivilCrearDTO} from '../modelos/CrearCivil';
import {Auth} from '../modelos/Auth';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

const apiUrl = '/api/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  registraCivil(crearCivil: CivilCrearDTO){
    return this.http.post<Auth>(`${apiUrl}/register`, crearCivil).pipe(
      catchError(error => {
        console.error('Error al crear el:', error);
        return throwError(() => new Error('Error al crear civil'));
      })
    );
  }
}
