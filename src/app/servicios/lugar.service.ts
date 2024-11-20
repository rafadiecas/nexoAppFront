import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DesaparicionPrincipal} from '../modelos/DesaparicionPrincipal';
import {Observable} from 'rxjs';
import {MapaPrincipal} from '../modelos/MapaPrincipal';
import {MapaDesaparicion} from '../modelos/MapaDesaparicion';

const apiUrl = '/api/lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private http: HttpClient) { }

  getLugaresPrincipal(): Observable<MapaPrincipal[]> {
    return this.http.get<MapaPrincipal[]>(`${apiUrl}/mapaPrincipal`);
  }

  getLugarDesaparicion(id: number): Observable<MapaDesaparicion> {
    return this.http.get<MapaDesaparicion>(`${apiUrl}/mapa?id=${id}`);
  }
}
