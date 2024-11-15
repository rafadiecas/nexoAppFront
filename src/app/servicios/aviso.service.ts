import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aviso } from '../modelos/Aviso';  // Asegúrate de tener un modelo adecuado

const apiUrl = '/api/aviso/mostrarAvisos'; // Endpoint para obtener todos los avisos

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  constructor(private http: HttpClient) { }

  // Método para obtener todos los avisos
  getAvisos(): Observable<Aviso[]> {
    return this.http.get<Aviso[]>(apiUrl);
  }
}
