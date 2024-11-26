import { Component } from '@angular/core';
import {
  DesaparicionFormComponent
} from '../../../shared/crear-desaparicion/crear-desaparicion.component';
import {EditaUsuarioComponent} from '../../perfil-usuario/componentes/edita-usuario/edita-usuario.component';
import {GestionUsuarioComponent} from '../../perfil-autoridad/componentes/gestion-usuario/gestion-usuario.component';
import {
  ListaDesaparicionesComponent
} from '../../perfil-usuario/componentes/lista-desapariciones/lista-desapariciones.component';
import {NgIf} from '@angular/common';
import {
  ParteIzquierdaCivilComponent
} from '../../perfil-usuario/componentes/parte-izquierda-civil/parte-izquierda-civil.component';
import {
  ListaDesaparicionesEliminadasComponent
} from '../componentes/lista-desapariciones-eliminadas/lista-desapariciones-eliminadas.component';
import {ListaNoAprobadasComponent} from '../../../shared/lista-no-aprobadas/lista-no-aprobadas.component';
import {
  EditaDesaparicionAutoridadComponent
} from '../../../shared/edita-desaparicion-autoridad/edita-desaparicion-autoridad.component';
import {AutoridadAvisosComponent} from '../../perfil-autoridad/componentes/autoridad-avisos/autoridad-avisos.component';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [
    DesaparicionFormComponent,
    EditaUsuarioComponent,
    GestionUsuarioComponent,
    ListaDesaparicionesComponent,
    NgIf,
    ParteIzquierdaCivilComponent,
    ListaDesaparicionesEliminadasComponent,
    ListaNoAprobadasComponent,
    EditaDesaparicionAutoridadComponent,
    AutoridadAvisosComponent
  ],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent {
  selectedOption: string = 'autDesapariciones';
  autoridadIcon: string = 'shield_person'
  menuOptions = [
    { label: 'Autorizar desaparicion', value: 'autDesapariciones' },
    { label: 'Gestión desapariciones', value: 'gesDesapariciones' },
    { label: 'Autorizar usuarios', value: 'gesUsuarios' },
    { label: 'Avisos', value: 'avisos' },
    { label: 'Eliminadas', value: 'eliminadas' },
  ];//cambiar esto para que lo pueda recivir del padre
  mapaDeIconos = {
    autDesapariciones: 'search_check_2',
    gesDesapariciones: 'manage_search',
    gesUsuarios: 'person_check',
    avisos: 'warning',
    elimindas: 'delete',
    crear: 'add'
  };
  onOptionSelected(option: string) {
    this.selectedOption = option;
  }
}
