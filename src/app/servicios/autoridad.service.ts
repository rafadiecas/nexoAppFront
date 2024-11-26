import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Autoridad} from '../modelos/Autoridad';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoridadService {

  private apiUrl = '/api/autoridad';

  constructor(private http: HttpClient) {}

  crearAutoridad(formData: FormData): Observable<any>{
    return this.http.post(`${this.apiUrl}/crearAutoridad`, formData);
  }
}
