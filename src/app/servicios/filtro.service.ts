import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Estado} from '../modelos/Estado';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sexo} from '../modelos/Sexo';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private apiUrl = '/filtrar';
  constructor(private http: HttpClient) {}

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('url/api/estados');
  }

  getSexos(): Observable<Sexo[]> {
    return this.http.get<Sexo[]>('url/api/sexos');
  }

  buscarPorFiltros(estado: string, sexo: string, fecha: string, nombre: string): Observable<Persona[]> {
    const params = new HttpParams()
      .set('estado', estado)
      .set('sexo', sexo)
      .set('fecha', fecha)
      .set('nombre', nombre);

    return this.http.get<Persona[]>(`${this.apiUrl}/filtrar`, { params });
  }
}
