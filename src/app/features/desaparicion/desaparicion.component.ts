import { Component } from '@angular/core';
import {MapaComponent} from './mapa/mapa.component';
import {DatosDesaparicionComponent} from "./datos-desaparicion/datos-desaparicion.component";

@Component({
  selector: 'app-desaparicion',
  standalone: true,
    imports: [
        MapaComponent,
        DatosDesaparicionComponent
    ],
  templateUrl: './desaparicion.component.html',
  styleUrl: './desaparicion.component.css'
})
export class DesaparicionComponent {

}
