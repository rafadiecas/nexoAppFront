import { Component } from '@angular/core';
import {DesaparicionPrincipalComponent} from './componentes/desaparicion-principal/desaparicion-principal.component';
import {EditaUsuarioComponent} from '../perfil-usuario/componentes/edita-usuario/edita-usuario.component';
import {InputFotosComponent} from '../perfil-usuario/componentes/input-fotos/input-fotos.component';
import {MapaPrincipalComponent} from './componentes/mapa-principal/mapa-principal.component';
import {RegistraUsuarioComponent} from '../../core/registra-usuario/registra-usuario.component';
import {DesaparicionFormComponent} from '../perfil-usuario/componentes/crear-desaparicion/crear-desaparicion.component';

import {ListaNoAprobadasComponent} from '../perfil-usuario/componentes/lista-no-aprobadas/lista-no-aprobadas.component';
import {
  EditaDesaparicionAutoridadComponent
} from '../perfil-usuario/componentes/edita-desaparicion-autoridad/edita-desaparicion-autoridad.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DesaparicionPrincipalComponent,
    RegistraUsuarioComponent,
    DesaparicionFormComponent,
    DesaparicionFormComponent,
    ListaNoAprobadasComponent,
    EditaDesaparicionAutoridadComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
