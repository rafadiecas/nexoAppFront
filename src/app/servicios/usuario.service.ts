import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
  eliminaUsuario(idUsuario: number): Observable<{ mensaje: string }>{
    return this.http.delete<{ mensaje: string }>(`${apiUrl}/eliminar?&id=${idUsuario}`);
  }
  verificaUsuario(idUsuario: number): Observable<{ mensaje: string }>{
    return this.http.put<{ mensaje: string }>(`${apiUrl}/verifica?&id=${idUsuario}`, {});
  }
}
