import { Component } from '@angular/core';
import {MapaComponent} from './mapa/mapa.component';
import {DatosDesaparicionComponent} from "./datos-desaparicion/datos-desaparicion.component";
import {ComentariosComponent} from './comentarios/comentarios.component';

@Component({
  selector: 'app-desaparicion',
  standalone: true,
  imports: [
    MapaComponent,
    DatosDesaparicionComponent,
    ComentariosComponent
  ],
  templateUrl: './desaparicion.component.html',
  styleUrl: './desaparicion.component.css'
})
export class DesaparicionComponent {

}
