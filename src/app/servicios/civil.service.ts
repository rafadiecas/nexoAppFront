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
/**
 * Servicio para el manejo de los civiles
 */
export class CivilService {

  constructor(private http: HttpClient) { }

  /**
   * Método para obtener un civil
   */
  getCivil(): Observable<Civil> {
    return this.http.get<Civil>(`${apiUrl}/editar`).pipe(
      catchError(error => {
        console.error('Error al obtener el civil:', error);
        return throwError(() => new Error('Error al obtener el civil'));
      })
    );
  }

  /**
   * Método para hacer update a un civil
   * @param civilDTO
   */
  actualizarCivil(civilDTO: Civil): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${apiUrl}`, civilDTO);
  }

  /**
   * Método para obtener la lista de desapariciones creadas por un civil
   */
  listaDesapariciones(): Observable<DesaparicionLista[]> {
    return this.http.get<DesaparicionLista[]>(`${apiUrl}/listaDesapariciones`)
  }

  /**
   * Método para obtener la lista de desapariciones en seguimiento
   *
   */
  listaSeguimiento(): Observable<DesaparicionLista[]> {
    return this.http.get<DesaparicionLista[]>(`${apiUrl}/seguimiento`)
  }

  /**
   * Método para obtener el correo y usuario para el menu
   */

  civilMenu(): Observable<UsuarioMenu> {
    return this.http.get<UsuarioMenu>(`${apiUrl}/menu`);
  }

  /**
   * Método para obtener la lista de civiles sin verificar
   *
   */
  listaCivilSinVer(): Observable<CivilConfirmar[]> {
    return this.http.get<CivilConfirmar[]>(`${apiUrl}/listaVerificar`);
  }


}
