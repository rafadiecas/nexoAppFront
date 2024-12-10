import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

/**
 * Componente para la página de error 404 que salta cuando no se encuentra una ruta o no se tiene acceso a ella.
 */
@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404Component {

}
