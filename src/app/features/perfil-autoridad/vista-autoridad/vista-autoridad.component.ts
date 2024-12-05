import { Component } from '@angular/core';
import {
    DesaparicionFormComponent
} from "../../../shared/crear-desaparicion/crear-desaparicion.component";
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
import {GestionUsuarioComponent} from '../componentes/gestion-usuario/gestion-usuario.component';
import {ListaNoAprobadasComponent} from '../../../shared/lista-no-aprobadas/lista-no-aprobadas.component';
import {
  EditaDesaparicionAutoridadComponent
} from '../../../shared/edita-desaparicion-autoridad/edita-desaparicion-autoridad.component';
import {AutoridadAvisosComponent} from '../componentes/autoridad-avisos/autoridad-avisos.component';

/**
 * Componente que contiene las opciones para la parte izquierda del perfil de una autoridad
 */
@Component({
  selector: 'app-vista-autoridad',
  standalone: true,
  imports: [
    DesaparicionFormComponent,
    EditaUsuarioComponent,
    ListaDesaparicionesComponent,
    ListaSeguimientoComponent,
    NgIf,
    ParteIzquierdaCivilComponent,
    GestionUsuarioComponent,
    ListaNoAprobadasComponent,
    EditaDesaparicionAutoridadComponent,
    AutoridadAvisosComponent
  ],
  templateUrl: './vista-autoridad.component.html',
  styleUrl: './vista-autoridad.component.css'
})
export class VistaAutoridadComponent {
  selectedOption: string = 'autDesapariciones';
  autoridadIcon: string = 'supervisor_account'
  menuOptions = [
    { label: 'Autorizar desaparicion', value: 'autDesapariciones' },
    { label: 'Gestión desapariciones', value: 'gesDesapariciones' },
    { label: 'Autorizar usuarios', value: 'gesUsuarios' },
    { label: 'Avisos', value: 'avisos' },
    { label: 'Crear desaparición', value: 'crear' },
  ];//cambiar esto para que lo pueda recivir del padre
  mapaDeIconos = {
    autDesapariciones: 'search_check_2',
    gesDesapariciones: 'manage_search',
    gesUsuarios: 'person_check',
    avisos: 'warning',
  };
  onOptionSelected(option: string) {
    this.selectedOption = option;
  }
}
