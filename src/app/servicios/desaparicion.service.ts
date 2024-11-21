import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesaparicionPrincipal } from '../modelos/DesaparicionPrincipal';
import {DesaparicionIndividual} from '../modelos/DesaparicionIndividual';
import {DesaparicionSinVerificar} from '../modelos/DesaparicionSinVerificar';

const apiUrl = '/api/desaparicion';

@Injectable({
  providedIn: 'root'
})
export class DesaparicionService {


  constructor(private http: HttpClient) { }

  getDesaparicionesPrincipal(): Observable<DesaparicionPrincipal[]> {
    return this.http.get<DesaparicionPrincipal[]>(`${apiUrl}/principal`);
  }

  getDesaparicionIndividual(id: number): Observable<DesaparicionIndividual> {
    return this.http.get<DesaparicionIndividual>(`${apiUrl}?id=${id}`);
  }

  guardarDesaparicion(formData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/guardar`, formData);
  }

  getNoAprobadas(): Observable<DesaparicionSinVerificar[]>{
    return this.http.get<DesaparicionSinVerificar[]>(`${apiUrl}/NoAprobadas`)
  }

  aprobarDesaparicion(id: number){
    return this.http.put(`${apiUrl}/aprobar?id=${id}`, {});
  }

  rechazarDesaparicion(id: number){
    return this.http.put(`${apiUrl}/eliminar?id=${id}`, {});
  }


}
