import { Component, Output, EventEmitter } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-parte-izquierda-civil',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './parte-izquierda-civil.component.html',
  styleUrls: ['./parte-izquierda-civil.component.css'] // Cambiado a styleUrls
})
export class ParteIzquierdaCivilComponent {

  menuOptions = [
    { label: 'Editar', value: 'editar' },
    { label: 'Desapariciones', value: 'desapariciones' },
    { label: 'Seguimiento', value: 'seguimiento' },
  ];

  @Output() optionSelected = new EventEmitter<string>();

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }

}
