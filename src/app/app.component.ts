import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GaleriaComponent} from './features/home/Componentes/galeria/galeria.component';
import {TareasComponent} from './features/home/Componentes/tareas/tareas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GaleriaComponent, TareasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nexoApp';
}
