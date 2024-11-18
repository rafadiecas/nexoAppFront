import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../modelos/Comentario';
const apiUrl = '/api/comentario';
const url = 'http://localhost:8081/comentario/crear';
@Injectable({
  providedIn: 'root',
})
export class ComentarioService {

  crearComentario(comentario: Comentario, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('comentario', JSON.stringify(comentario)); // Comentario como JSON

    if (files) {
      files.forEach(file => {
        formData.append('files', file as Blob); // Aseguramos que el archivo es tratado como un Blob
      });
    }

    return this.http.post(url, formData); // Enviar a la API
  }



  constructor(private http: HttpClient) {}

  /**
   * Obtiene los comentarios asociados a una desaparición específica.
   * @param desaparicionId ID de la desaparición.
   * @returns Observable con la lista de comentarios.
   */
  obtenerComentariosPorDesaparicion(desaparicionId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${apiUrl}/desaparicion/${desaparicionId}`);
  }
  agregarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${apiUrl}/agregar`, comentario);
  }
}
