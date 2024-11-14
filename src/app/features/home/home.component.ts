import { Component } from '@angular/core';
import {DesaparicionPrincipalComponent} from './componentes/desaparicion-principal/desaparicion-principal.component';
import {InputFotosComponent} from '../perfil-usuario/componentes/input-fotos/input-fotos.component';
import {InputShareComponent} from '../../shared/input-share/input-share.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DesaparicionPrincipalComponent,
    InputFotosComponent,
    InputShareComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
