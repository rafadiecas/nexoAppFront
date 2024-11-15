import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Civil} from '../modelos/Civil';

const apiUrl = '/api/civil';
@Injectable({
  providedIn: 'root'
})
export class CivilService {

  constructor(private http: HttpClient) { }

  getCivil(id: number): Observable<Civil> {
    return this.http.get<Civil>(`${apiUrl}/editar?id=${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener el civil:', error);
        return throwError(() => new Error('Error al obtener el civil'));
      })
    );
  }

  actualizarCivil(id: number, civilDTO: Civil): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${apiUrl}/${id}`, civilDTO);
  }

}
