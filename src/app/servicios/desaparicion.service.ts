import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesaparicionPrincipal } from '../modelos/DesaparicionPrincipal';
import {DesaparicionIndividual} from '../modelos/DesaparicionIndividual';
import {DesaparicionSinVerificar} from '../modelos/DesaparicionSinVerificar';
import {EditaDesaparicion} from '../modelos/editaDesaparicion';

const apiUrl = '/api/desaparicion';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de desapariciones.
 */
export class DesaparicionService {


  constructor(private http: HttpClient) { }

  /**
   * Obtiene las desapariciones para la pagina principal
   */
  getDesaparicionesPrincipal(): Observable<DesaparicionPrincipal[]> {
    return this.http.get<DesaparicionPrincipal[]>(`${apiUrl}/principal`);
  }

  /**
   * Obtiene una desaparición con todos sus datos para su página individual
   * @param id
   */
  getDesaparicionIndividual(id: number): Observable<DesaparicionIndividual> {
    return this.http.get<DesaparicionIndividual>(`${apiUrl}?id=${id}`);
  }

  /**
   * Guarda una desaparición en la base de datos
   * @param formData
   */

  guardarDesaparicion(formData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/guardar`, formData, { responseType: 'text' });
  }

  /**
   * Obtiene las desapariciones no aprobadadas
   */
  getNoAprobadas(): Observable<DesaparicionSinVerificar[]>{
    return this.http.get<DesaparicionSinVerificar[]>(`${apiUrl}/NoAprobadas`)
  }

  /**
   * Aprueba una desaparición
   * @param id
   */
  aprobarDesaparicion(id: number): Observable<string> {
    return this.http.put(`${apiUrl}/aprobar?id=${id}`, {}, { responseType: 'text' });
  }

  /**
   * Rechaza una desaparición, poniendola en estado eliminada
   * @param id
   */
  rechazarDesaparicion(id: number):Observable<string>{
    return this.http.put(`${apiUrl}/eliminar?id=${id}`, {},{ responseType: 'text' });
  }

  /**
   * Edita una desaparición
   * @param id
   * @param editarDesaparicionDTO
   */

  editarDesaparicionAutoridad(id: number, editarDesaparicionDTO: EditaDesaparicion): Observable<any> {
    const url = `${apiUrl}/editarAutoridadDesaparicion`;
    const params = { id: id.toString() };
    return this.http.post(url, editarDesaparicionDTO, { params, responseType: 'text' });
  }

  /**
   * Obtiene los datos de una desaparición para editar
   * @param id
   */
  getEditarDesaparicion(id: number): Observable<EditaDesaparicion> {
    return this.http.get<EditaDesaparicion>(`${apiUrl}/getDesaparicionEditar?id=${id}`);
  }

  /**
   * Busca desapariciones según un filtro
   * @param filtro
   */
  buscarDesapariciones(filtro: any): Observable<any[]> {
    const params = Object.keys(filtro)
      .filter((key) => filtro[key])
      .reduce((obj, key) => {
        obj[key] = filtro[key];
        return obj;
      }, {} as { [key: string]: string });

    return this.http.get<any[]>(`${apiUrl}/filtrar`, { params });
  }

  /**
   * Obtiene las desapariciones eliminadas, osea que tengan eliminado = true
   */
  getEliminadas(): Observable<DesaparicionSinVerificar[]> {
    return this.http.get<DesaparicionSinVerificar[]>(`${apiUrl}/eliminadas`);
  }

  /**
   * Recupera una desaparición eliminada, eliminado = false
   * @param id
   */
  recuperarEliminacion(id: number): Observable<string> {
    return this.http.post(`${apiUrl}/recuperar?id=${id}`, {}, { responseType: 'text' });
  }

  /**
   * Elimina una desaparición de la base de datos
   * @param id
   */
  eliminarDesaparicion(id: number): Observable<string> {
    return this.http.delete(`${apiUrl}?id=${id}`, { responseType: 'text' });
  }


}
