import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioListaAdmin} from '../modelos/UsuarioListaAdmin';

const apiUrl = '/api/usuario';
@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de usuarios.
 */
export class UsuarioService {

  constructor(private http: HttpClient) { }

  /**
   * añade una desaparición a la lista de seguimientos del usuario
   * @param idDesaparicion
   */
  anyadirSeguimiento(idDesaparicion: number) {
    return this.http.post(`${apiUrl}/seguimiento/anyadir?&idDesaparicion=${idDesaparicion}`, {});
  }

  /**
   * elimina una desaparición de la lista de seguimientos del usuario
   * @param idDesaparicion
   */
  eliminarSeguimiento(idDesaparicion: number) {
    return this.http.delete(`${apiUrl}/seguimiento/eliminar?&idDesaparicion=${idDesaparicion}`);
  }

  /**
   * Elimina un usuario, poniendo no verificado
   * @param idUsuario
   */
  eliminaUsuario(idUsuario: number): Observable<{ mensaje: string }>{
    return this.http.delete<{ mensaje: string }>(`${apiUrl}/eliminar?&id=${idUsuario}`);
  }

  /**
   * Verifica un usuario
   * @param idUsuario
   */
  verificaUsuario(idUsuario: number): Observable<{ mensaje: string }>{
    return this.http.put<{ mensaje: string }>(`${apiUrl}/verifica?&id=${idUsuario}`, {});
  }

  /**
   * Obtiene los usuarios para el componente de admin
   */
  getUsuariosAdmin (): Observable<UsuarioListaAdmin[]>{
    return this.http.get<UsuarioListaAdmin[]>(`${apiUrl}/listaUsuarios`);
  }

  /**
   * Elimina un usuario de la base de datos
   */
  eliminarUsuario(id: number): Observable<string> {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      responseType: 'text' as 'json'
    };
    return this.http.delete<string>(`${apiUrl}/eliminar/civil?id=${id}`, options);
  }

}
