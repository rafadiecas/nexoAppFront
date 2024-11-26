import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private datosActualizados = new BehaviorSubject<boolean>(false);
  datosActualizados$ = this.datosActualizados.asObservable();

  notificarActualizacion() {
    this.datosActualizados.next(true);
  }
}
