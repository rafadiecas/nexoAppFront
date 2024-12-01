import { Component } from '@angular/core';
import {DesaparicionPrincipalComponent} from './componentes/desaparicion-principal/desaparicion-principal.component';
import {EditaUsuarioComponent} from '../perfil-usuario/componentes/edita-usuario/edita-usuario.component';
import {InputFotosComponent} from '../perfil-usuario/componentes/input-fotos/input-fotos.component';
import {MapaPrincipalComponent} from './componentes/mapa-principal/mapa-principal.component';
import {RegistraUsuarioComponent} from '../../core/registra-usuario/registra-usuario.component';
import {AvisoPrincipalComponent} from './componentes/aviso-principal/aviso-principal.component';

import {SobreNosotrosComponent} from './componentes/sobre-nosotros/sobre-nosotros.component';


/**
 * Componente principal de la aplicación, la pagina de inicio
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DesaparicionPrincipalComponent,
    RegistraUsuarioComponent,
    AvisoPrincipalComponent,
    MapaPrincipalComponent,
    SobreNosotrosComponent,
    MapaPrincipalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
