import { Component } from '@angular/core';
import {DesaparicionPrincipalComponent} from './componentes/desaparicion-principal/desaparicion-principal.component';
import {EditaUsuarioComponent} from '../perfil-usuario/componentes/edita-usuario/edita-usuario.component';
import {InputFotosComponent} from '../perfil-usuario/componentes/input-fotos/input-fotos.component';
import {MapaPrincipalComponent} from './componentes/mapa-principal/mapa-principal.component';
import {RegistraUsuarioComponent} from '../../core/registra-usuario/registra-usuario.component';
import {DesaparicionFormComponent} from '../perfil-usuario/componentes/crear-desaparicion/crear-desaparicion.component';
import {AvisoPrincipalComponent} from './componentes/aviso-principal/aviso-principal.component';
import {ListaNoAprobadasComponent} from '../perfil-autoridad/componentes/lista-no-aprobadas/lista-no-aprobadas.component';
import {
  ListaDesaparicionesEliminadasComponent
} from '../admin-panel/lista-desapariciones-eliminadas/lista-desapariciones-eliminadas.component';
import {SobreNosotrosComponent} from './componentes/sobre-nosotros/sobre-nosotros.component';
import {CrearAutoridadComponent} from '../admin-panel/crear-autoridad/crear-autoridad.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DesaparicionPrincipalComponent,
    RegistraUsuarioComponent,
    DesaparicionFormComponent,
    AvisoPrincipalComponent,
    ListaNoAprobadasComponent,
    MapaPrincipalComponent,
    ListaDesaparicionesEliminadasComponent,
    SobreNosotrosComponent,
    CrearAutoridadComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
