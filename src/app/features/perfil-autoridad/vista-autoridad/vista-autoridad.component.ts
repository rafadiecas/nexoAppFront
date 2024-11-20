import { Component } from '@angular/core';
import {
    DesaparicionFormComponent
} from "../../perfil-usuario/componentes/crear-desaparicion/crear-desaparicion.component";
import {EditaUsuarioComponent} from "../../perfil-usuario/componentes/edita-usuario/edita-usuario.component";
import {
    ListaDesaparicionesComponent
} from "../../perfil-usuario/componentes/lista-desapariciones/lista-desapariciones.component";
import {
    ListaSeguimientoComponent
} from "../../perfil-usuario/componentes/lista-seguimiento/lista-seguimiento.component";
import {NgIf} from "@angular/common";
import {
    ParteIzquierdaCivilComponent
} from "../../perfil-usuario/componentes/parte-izquierda-civil/parte-izquierda-civil.component";

@Component({
  selector: 'app-vista-autoridad',
  standalone: true,
    imports: [
        DesaparicionFormComponent,
        EditaUsuarioComponent,
        ListaDesaparicionesComponent,
        ListaSeguimientoComponent,
        NgIf,
        ParteIzquierdaCivilComponent
    ],
  templateUrl: './vista-autoridad.component.html',
  styleUrl: './vista-autoridad.component.css'
})
export class VistaAutoridadComponent {

}
