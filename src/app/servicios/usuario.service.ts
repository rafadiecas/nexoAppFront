import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

}
