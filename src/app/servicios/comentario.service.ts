import { Injectable } from '@angular/core';
import {Comentario} from '../modelos/Comentario';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ComentarioListar} from '../modelos/ComentarioListar';
import {DenunciaComentario} from '../modelos/DenunciaComentario';

const apiUrl = '/api/comentario';
@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de comentarios.
 */
export class ComentarioService {

  constructor(private http: HttpClient) {}

  /**
   * Crea un comentario.
   * @param comentario
   * @param files
   */
  crearComentario(comentario: any, files: File[] | null): Observable<string> {
    const formData = new FormData();

    formData.append('comentario', JSON.stringify(comentario));

    if (files) {
      files.forEach((file, index) => {
        formData.append('files', file);
      });
    }

    return this.http.post<string>(`${apiUrl}/crear`, formData, { responseType: 'text' as 'json' });
  }


  /**
   * Obtiene los comentarios asociados a una desaparición específica.
   * @param desaparicionId ID de la desaparición.
   * @returns Observable con la lista de comentarios.
   */
  obtenerComentariosPorDesaparicion(desaparicionId: number): Observable<ComentarioListar[]> {
    return this.http.get<ComentarioListar[]>(`${apiUrl}/desaparicion/${desaparicionId}`);
  }

  /**
   * Denuncia un comentario.
   * @param denuncia
   */
  denunciarComentario(denuncia:DenunciaComentario): Observable<string> {
    return this.http.post<string>(`${apiUrl}/denunciar`, denuncia, { responseType: 'text' as 'json' });
  }

  eliminarComentario(id: number): Observable<string> {
    return this.http.delete<string>(`${apiUrl}/eliminar/${id}`, { responseType: 'text' as 'json' });
  }


}
