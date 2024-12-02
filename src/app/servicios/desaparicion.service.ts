import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesaparicionPrincipal } from '../modelos/DesaparicionPrincipal';
import {DesaparicionIndividual} from '../modelos/DesaparicionIndividual';
import {DesaparicionSinVerificar} from '../modelos/DesaparicionSinVerificar';
import {EditaDesaparicion} from '../modelos/editaDesaparicion';
import {DesaparicionEditaAutoridad} from '../modelos/DesaparicionEditaAutoridad';
import {DesaparicionGestionDTO} from '../modelos/DesaparicionGestionDTO';

const apiUrl = '/api/desaparicion';

@Injectable({
  providedIn: 'root'
})
export class DesaparicionService {


  constructor(private http: HttpClient) { }

  getDesaparicionesPrincipal(): Observable<DesaparicionPrincipal[]> {
    return this.http.get<DesaparicionPrincipal[]>(`${apiUrl}/principal`);
  }
  getDesaparicionGestion(): Observable<DesaparicionGestionDTO[]>{
    return this.http.get<DesaparicionGestionDTO[]>(`${apiUrl}/desaparicionesGestion`);
  }

  getDesaparicionIndividual(id: number): Observable<DesaparicionIndividual> {
    return this.http.get<DesaparicionIndividual>(`${apiUrl}?id=${id}`);
  }

  guardarDesaparicion(formData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/guardar`, formData, { responseType: 'text' });
  }


  getNoAprobadas(): Observable<DesaparicionSinVerificar[]>{
    return this.http.get<DesaparicionSinVerificar[]>(`${apiUrl}/NoAprobadas`)
  }

  aprobarDesaparicion(id: number): Observable<string> {
    return this.http.put(`${apiUrl}/aprobar?id=${id}`, {}, { responseType: 'text' });
  }


  rechazarDesaparicion(id: number):Observable<string>{
    return this.http.put(`${apiUrl}/eliminar?id=${id}`, {},{ responseType: 'text' });
  }

  editarDesaparicionAutoridad(id: number, editarDesaparicionDTO: EditaDesaparicion): Observable<any> {
    const url = `${apiUrl}/editarAutoridadDesaparicion`;
    const params = { id: id.toString() };
    return this.http.post(url, editarDesaparicionDTO, { params, responseType: 'text' });
  }
  editarDesaparicionGestion(formData: FormData): Observable<any> {
    const url = `${apiUrl}/editarDesaparicionGestion`;
    return this.http.put(url, formData, { responseType: 'text' });
  }

  getEditarDesaparicion(id: number): Observable<EditaDesaparicion> {
    return this.http.get<EditaDesaparicion>(`${apiUrl}/getDesaparicionEditar?id=${id}`);
  }
  getEditarDesaparicionAutoridad(id: number): Observable<DesaparicionEditaAutoridad> {
    return this.http.get<EditaDesaparicion>(`${apiUrl}/getDesaparicionEditarAutoridad?id=${id}`);
  }
  buscarDesapariciones(filtro: any): Observable<any[]> {
    const params = Object.keys(filtro)
      .filter((key) => filtro[key])
      .reduce((obj, key) => {
        obj[key] = filtro[key];
        return obj;
      }, {} as { [key: string]: string });

    return this.http.get<any[]>(`${apiUrl}/filtrar`, { params });
  }


  getEliminadas(): Observable<DesaparicionSinVerificar[]> {
    return this.http.get<DesaparicionSinVerificar[]>(`${apiUrl}/eliminadas`);
  }

  recuperarEliminacion(id: number): Observable<string> {
    return this.http.post(`${apiUrl}/recuperar?id=${id}`, {}, { responseType: 'text' });
  }

  eliminarDesaparicion(id: number): Observable<string> {
    return this.http.delete(`${apiUrl}?id=${id}`, { responseType: 'text' });
  }

}
