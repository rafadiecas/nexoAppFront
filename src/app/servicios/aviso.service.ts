import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aviso } from '../modelos/Aviso';


@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private apiUrl = '/api/aviso'; // URL base del API de avisos

  constructor(private http: HttpClient) { }

  // Método para obtener todos los avisos
  getAvisos(): Observable<Aviso[]> {
    return this.http.get<Aviso[]>(`${this.apiUrl}/mostrarAvisos`);
  }
  // Método para obtener todos los avisos
  getAvisosAutoridad(): Observable<Aviso[]> {
    return this.http.get<Aviso[]>(`${this.apiUrl}/listarAvisosAdmin`);
  }

  // Método para crear un nuevo aviso
  crearAviso(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearAviso`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      responseType: 'json'
    });
  }

  // Eliminar un aviso
  eliminarAviso(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/eliminar?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      responseType: 'text'  // Esto indica que Angular debe esperar un texto
    });
  }

}
