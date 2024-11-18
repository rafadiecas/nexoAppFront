import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const apiUrl = '/api/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  anyadirSeguimiento(id: number, idDesaparicion: number) {
    return this.http.post(`${apiUrl}/seguimiento/anyadir?id=${id}&idDesaparicion=${idDesaparicion}`, {});
  }

  eliminarSeguimiento(id: number, idDesaparicion: number) {
    return this.http.delete(`${apiUrl}/seguimiento/eliminar?id=${id}&idDesaparicion=${idDesaparicion}`);
  }

}
