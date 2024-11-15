import {Component} from '@angular/core';
import {ParteIzquierdaCivilComponent} from '../parte-izquierda-civil/parte-izquierda-civil.component';
import {NgIf} from '@angular/common';
import {EditaUsuarioComponent} from '../edita-usuario/edita-usuario.component';
import {ListaDesaparicionesComponent} from '../lista-desapariciones/lista-desapariciones.component';

@Component({
  selector: 'app-perfil-civil',
  standalone: true,
  imports: [
    ParteIzquierdaCivilComponent,
    NgIf,
    EditaUsuarioComponent,
    ListaDesaparicionesComponent,
  ],
  templateUrl: './perfil-civil.component.html',
  styleUrls: ['./perfil-civil.component.css'],
})
export class PerfilCivilComponent {
  selectedOption: string = '';


  onOptionSelected(option: string) {
    this.selectedOption = option;
  }
}
