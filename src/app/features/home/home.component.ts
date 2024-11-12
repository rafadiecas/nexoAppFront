import { Component } from '@angular/core';
import {GaleriaComponent} from './Componentes/galeria/galeria.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GaleriaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
