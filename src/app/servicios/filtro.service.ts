import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Estado} from '../modelos/Estado';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sexo} from '../modelos/Sexo';
import {Persona} from '../modelos/Persona';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de filtro de desapariciones
 */
export class FiltroService {
  private apiUrl = '/api/desaparicion/filtrar';
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los estados desde el backend
   */
  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`);
  }

  /**
   * Obtiene los sexos desde el backend
   */
  getSexos(): Observable<Sexo[]> {
    return this.http.get<Sexo[]>(`${this.apiUrl}/sexos`);
  }

  /**
   * Obtiene los desaparecidos que cumplen con los filtros
   * @param estado
   * @param fecha
   * @param nombre
   */
  buscarPorFiltros(estado: string, fecha: string, nombre: string): Observable<Persona[]> {
    const params = new HttpParams()
      .set('estado', estado)
      .set('fecha', fecha)
      .set('nombre', nombre);

    return this.http.get<Persona[]>(`${this.apiUrl}`, { params });
  }
}
