import { Injectable } from '@angular/core';
import {Notificacion} from '../modelos/Notificacion';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de notificaciones.
 */
export class NotificacionService {

  private apiUrl = '/api/notificacion';


  constructor(private http: HttpClient) { }

  /**
   * Obtiene las notificaciones del usuario
   */
  obtenerNotificaciones(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/listar`);
  }

  /**
   * Establece una notificación como leída
   * @param idNotificacion
   */
  setNotificacionLeida(idNotificacion: number): Observable<any>{
    return this.http.put(`${this.apiUrl}/modNotificacion?idNotificacion=${idNotificacion}`, null);
  }
}
