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
/**
 * Servicio para la gestión de lugares de desaparición.
 */
export class LugarService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los lugares de desaparición para el mapa de la pagina principal
   */
  getLugaresPrincipal(): Observable<MapaPrincipal[]> {
    return this.http.get<MapaPrincipal[]>(`${apiUrl}/mapaPrincipal`);
  }

  /**
   * Obtiene un lugar de desaparición con todos sus datos para su página individual
   * @param id
   */
  getLugarDesaparicion(id: number): Observable<MapaDesaparicion> {
    return this.http.get<MapaDesaparicion>(`${apiUrl}/mapa?id=${id}`);
  }
}
