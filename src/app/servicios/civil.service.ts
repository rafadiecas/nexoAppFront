import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Civil} from '../modelos/Civil';
import {DesaparicionLista} from '../modelos/DesaparicionLista';
import {UsuarioMenu} from "../modelos/UsuarioMenu";
import {CivilCrearDTO} from '../modelos/CrearCivil';
import {Auth} from '../modelos/Auth';
import {CivilConfirmar} from '../modelos/CivilConfirmar';

const apiUrl = '/api/civil';
@Injectable({
  providedIn: 'root'
})
export class CivilService {

  constructor(private http: HttpClient) { }

  getCivil(): Observable<Civil> {
    return this.http.get<Civil>(`${apiUrl}/editar`).pipe(
      catchError(error => {
        console.error('Error al obtener el civil:', error);
        return throwError(() => new Error('Error al obtener el civil'));
      })
    );
  }

  actualizarCivil(civilDTO: Civil): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${apiUrl}`, civilDTO);
  }

  listaDesapariciones(): Observable<DesaparicionLista[]> {
    return this.http.get<DesaparicionLista[]>(`${apiUrl}/listaDesapariciones`)
  }

  listaSeguimiento(): Observable<DesaparicionLista[]> {
    return this.http.get<DesaparicionLista[]>(`${apiUrl}/seguimiento`)
  }

  civilMenu(): Observable<UsuarioMenu> {
    return this.http.get<UsuarioMenu>(`${apiUrl}/menu`);
  }

  listaCivilSinVer(): Observable<CivilConfirmar[]> {
    return this.http.get<CivilConfirmar[]>(`${apiUrl}/listaVerificar`);
  }


}
