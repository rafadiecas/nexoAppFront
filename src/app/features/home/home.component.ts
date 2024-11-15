import { Component } from '@angular/core';
import {DesaparicionPrincipalComponent} from './componentes/desaparicion-principal/desaparicion-principal.component';
import {EditaUsuarioComponent} from '../perfil-usuario/componentes/edita-usuario/edita-usuario.component';
import {InputFotosComponent} from '../perfil-usuario/componentes/input-fotos/input-fotos.component';
import {MapaPrincipalComponent} from './componentes/mapa-principal/mapa-principal.component';
import {
  ListaDesaparicionesComponent
} from '../perfil-usuario/componentes/lista-desapariciones/lista-desapariciones.component';
import {
  ParteIzquierdaCivilComponent
} from '../perfil-usuario/componentes/parte-izquierda-civil/parte-izquierda-civil.component';
import {PerfilCivilComponent} from '../perfil-usuario/componentes/perfil-civil/perfil-civil.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DesaparicionPrincipalComponent,
    MapaPrincipalComponent,
    EditaUsuarioComponent,
    ListaDesaparicionesComponent,
    ParteIzquierdaCivilComponent,
    PerfilCivilComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
