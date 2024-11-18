import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { UsuarioMenu } from '../../../../modelos/UsuarioMenu';
import { CivilService } from '../../../../servicios/civil.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-parte-izquierda-civil',
  standalone: true,
  imports: [
    NgForOf,
    MatIcon
  ],
  templateUrl: './parte-izquierda-civil.component.html',
  styleUrls: ['./parte-izquierda-civil.component.css']
})
export class ParteIzquierdaCivilComponent implements OnInit {

  menu: UsuarioMenu | undefined;
  selectedOption: string = '';

  menuOptions = [
    { label: 'Editar', value: 'editar' },
    { label: 'Desapariciones', value: 'desapariciones' },
    { label: 'Seguimiento', value: 'seguimiento' },
  ];

  @Output() optionSelected = new EventEmitter<string>();

  constructor(private civilService: CivilService) {}

  ngOnInit() {
    this.civilService.civilMenu(3).subscribe(menu => this.menu = menu);
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
  }

  getIcon(value: string): string {
    switch (value) {
      case 'editar': return 'edit';
      case 'desapariciones': return 'search';
      case 'seguimiento': return 'track_changes';
      default: return 'help_outline';
    }
  }
}
