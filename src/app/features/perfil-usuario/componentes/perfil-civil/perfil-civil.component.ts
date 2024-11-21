import {Component} from '@angular/core';
import {ParteIzquierdaCivilComponent} from '../parte-izquierda-civil/parte-izquierda-civil.component';
import {NgIf} from '@angular/common';
import {EditaUsuarioComponent} from '../edita-usuario/edita-usuario.component';
import {ListaDesaparicionesComponent} from '../lista-desapariciones/lista-desapariciones.component';
import {ListaSeguimientoComponent} from '../lista-seguimiento/lista-seguimiento.component';
import {DesaparicionFormComponent} from '../crear-desaparicion/crear-desaparicion.component';

@Component({
  selector: 'app-perfil-civil',
  standalone: true,
  imports: [
    ParteIzquierdaCivilComponent,
    NgIf,
    EditaUsuarioComponent,
    ListaDesaparicionesComponent,
    ListaSeguimientoComponent,
    DesaparicionFormComponent,
  ],
  templateUrl: './perfil-civil.component.html',
  styleUrls: ['./perfil-civil.component.css'],
})
export class PerfilCivilComponent {
  selectedOption: string = 'editar';
  iconoUsuario: string = 'account_circle'
  menuOptions = [
    { label: 'Editar', value: 'editar' },
    { label: 'Desapariciones', value: 'desapariciones' },
    { label: 'Seguimiento', value: 'seguimiento' },
    { label: 'Añadir', value: 'anyadir' },
  ];//cambiar esto para que lo pueda recivir del padre
  mapaDeIconos = {
    editar: 'edit',
    desapariciones: 'search',
    seguimiento: 'track_changes',
    anyadir: 'add_circle',
  };
  onOptionSelected(option: string) {
    this.selectedOption = option;
  }
}
