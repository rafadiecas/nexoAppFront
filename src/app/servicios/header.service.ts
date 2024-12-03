import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para la gestión de la cabecera.
 */
export class HeaderService {
  /**
   * Variable que indica si los datos de la cabecera han sido actualizados.
   * @private
   */
  private datosActualizados = new BehaviorSubject<boolean>(false);
  datosActualizados$ = this.datosActualizados.asObservable();

  /**
   * Notifica que los datos de la cabecera han sido actualizados.
   */
  notificarActualizacion() {
    this.datosActualizados.next(true);
  }
}
