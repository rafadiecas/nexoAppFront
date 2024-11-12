import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesaparicionPrincipal } from '../../../modelos/DesaparicionPrincipal';

const apiUrl = 'http://localhost:8081/desaparicion';

@Injectable({
  providedIn: 'root'
})
export class DesaparicionPrincipalService {

  constructor(private http: HttpClient) { }

  getDesaparicionesPrincipal(): Observable<DesaparicionPrincipal[]> {
    return this.http.get<DesaparicionPrincipal[]>(`${apiUrl}/principal`);
  }
}
