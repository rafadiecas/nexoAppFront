import { Component } from '@angular/core';
import {
  DesaparicionFormComponent
} from '../../perfil-usuario/componentes/crear-desaparicion/crear-desaparicion.component';
import {EditaUsuarioComponent} from '../../perfil-usuario/componentes/edita-usuario/edita-usuario.component';
import {GestionUsuarioComponent} from '../../perfil-autoridad/componentes/gestion-usuario/gestion-usuario.component';
import {
  ListaDesaparicionesComponent
} from '../../perfil-usuario/componentes/lista-desapariciones/lista-desapariciones.component';
import {NgIf} from '@angular/common';
import {
  ParteIzquierdaCivilComponent
} from '../../perfil-usuario/componentes/parte-izquierda-civil/parte-izquierda-civil.component';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [
    DesaparicionFormComponent,
    EditaUsuarioComponent,
    GestionUsuarioComponent,
    ListaDesaparicionesComponent,
    NgIf,
    ParteIzquierdaCivilComponent
  ],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent {
  selectedOption: string = 'autDesapariciones';
  autoridadIcon: string = 'shield_person'
  menuOptions = [
    { label: 'Autorizar desapariciones', value: 'autDesapariciones' },
    { label: 'Gestión desapariciones', value: 'gesDesapariciones' },
    { label: 'Autorizar usuarios', value: 'gesUsuarios' },
    { label: 'Avisos', value: 'avisos' },
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
