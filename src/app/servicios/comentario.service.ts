import { Injectable } from '@angular/core';
import {Comentario} from '../modelos/Comentario';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ComentarioListar} from '../modelos/ComentarioListar';

const apiUrl = '/api/comentario';
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) {}

  crearComentario(comentario: any, files: File[] | null): Observable<any> {
    const formData = new FormData();

    formData.append('comentario', JSON.stringify(comentario));

    if (files) {
      files.forEach((file, index) => {
        formData.append('files', file);
      });
    }

    return this.http.post<any>(`${apiUrl}/crear`, formData);
  }

  /**
   * Obtiene los comentarios asociados a una desaparición específica.
   * @param desaparicionId ID de la desaparición.
   * @returns Observable con la lista de comentarios.
   */
  obtenerComentariosPorDesaparicion(desaparicionId: number): Observable<ComentarioListar[]> {
    return this.http.get<ComentarioListar[]>(`${apiUrl}/desaparicion/${desaparicionId}`);
  }
}
