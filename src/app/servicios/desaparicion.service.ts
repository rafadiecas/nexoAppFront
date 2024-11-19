import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesaparicionPrincipal } from '../modelos/DesaparicionPrincipal';
import {DesaparicionIndividual} from '../modelos/DesaparicionIndividual';

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
}
