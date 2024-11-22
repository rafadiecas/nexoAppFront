import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioListaAdmin} from '../modelos/UsuarioListaAdmin';

const apiUrl = '/api/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  anyadirSeguimiento(idDesaparicion: number) {
    return this.http.post(`${apiUrl}/seguimiento/anyadir?&idDesaparicion=${idDesaparicion}`, {});
  }

  eliminarSeguimiento(idDesaparicion: number) {
    return this.http.delete(`${apiUrl}/seguimiento/eliminar?&idDesaparicion=${idDesaparicion}`);
  }

  getUsuariosAdmin (): Observable<UsuarioListaAdmin[]>{
    return this.http.get<UsuarioListaAdmin[]>(`${apiUrl}/listaUsuarios`);
  }

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
