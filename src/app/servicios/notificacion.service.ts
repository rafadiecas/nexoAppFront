import { Injectable } from '@angular/core';
import {Notificacion} from '../modelos/Notificacion';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private apiUrl = '/api/notificacion';


  constructor(private http: HttpClient) { }

  obtenerNotificaciones(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/loquesea`);
  }
}
