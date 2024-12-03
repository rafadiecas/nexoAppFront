import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de localizaciones para el formulario de desaparición.
 */
export class LocalizacionService {

  private jsonUrl = "assets/arbol.json";

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las localizaciones desde un json, con todas las provincias y pueblos de españa
   */
  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
