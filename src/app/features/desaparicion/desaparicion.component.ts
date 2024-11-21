import { Component } from '@angular/core';
import {MapaComponent} from './mapa/mapa.component';
import {DatosDesaparicionComponent} from "./datos-desaparicion/datos-desaparicion.component";
import {ComentariosComponent} from './comentarios/comentarios.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-desaparicion',
  standalone: true,
  imports: [
    MapaComponent,
    DatosDesaparicionComponent,
    ComentariosComponent,
    NgIf
  ],
  templateUrl: './desaparicion.component.html',
  styleUrl: './desaparicion.component.css'
})
export class DesaparicionComponent {
  validacion: boolean | undefined;
  onValidacionChange(validacion: boolean) {
    this.validacion = validacion;
  }
}
