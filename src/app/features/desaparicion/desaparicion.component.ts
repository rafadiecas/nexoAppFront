import { Component } from '@angular/core';
import {MapaComponent} from './mapa/mapa.component';

@Component({
  selector: 'app-desaparicion',
  standalone: true,
  imports: [
    MapaComponent
  ],
  templateUrl: './desaparicion.component.html',
  styleUrl: './desaparicion.component.css'
})
export class DesaparicionComponent {

}
