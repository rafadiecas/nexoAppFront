import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {UsuarioMenu} from '../../../../modelos/UsuarioMenu';
import {CivilService} from '../../../../servicios/civil.service';

@Component({
  selector: 'app-parte-izquierda-civil',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './parte-izquierda-civil.component.html',
  styleUrls: ['./parte-izquierda-civil.component.css'] // Cambiado a styleUrls
})
export class ParteIzquierdaCivilComponent implements OnInit {

  menu: UsuarioMenu | undefined;

  constructor(private civilService: CivilService) {}

  ngOnInit() {
    this.civilService.civilMenu(3).subscribe(menu => this.menu = menu);
  }

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
