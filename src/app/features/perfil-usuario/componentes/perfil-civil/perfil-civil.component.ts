import {Component} from '@angular/core';
import {ParteIzquierdaCivilComponent} from '../parte-izquierda-civil/parte-izquierda-civil.component';
import {NgIf} from '@angular/common';
import {EditaUsuarioComponent} from '../edita-usuario/edita-usuario.component';
import {ListaDesaparicionesComponent} from '../lista-desapariciones/lista-desapariciones.component';
import {ListaSeguimientoComponent} from '../lista-seguimiento/lista-seguimiento.component';

@Component({
  selector: 'app-perfil-civil',
  standalone: true,
  imports: [
    ParteIzquierdaCivilComponent,
    NgIf,
    EditaUsuarioComponent,
    ListaDesaparicionesComponent,
    ListaSeguimientoComponent,
  ],
  templateUrl: './perfil-civil.component.html',
  styleUrls: ['./perfil-civil.component.css'],
})
export class PerfilCivilComponent {
  selectedOption: string = 'editar';


  onOptionSelected(option: string) {
    this.selectedOption = option;
  }
}
