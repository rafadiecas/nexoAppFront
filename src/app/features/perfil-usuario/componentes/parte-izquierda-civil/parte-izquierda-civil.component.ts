import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { NgForOf } from '@angular/common';
import { UsuarioMenu } from '../../../../modelos/UsuarioMenu';
import { CivilService } from '../../../../servicios/civil.service';
import {MatIcon} from '@angular/material/icon';

/**
 * Componente que muestra el menú de opciones de la parte izquierda de la vista de perfil de usuario, en conjunto con los demas muestra las opciones depediendo del rol del usuario que inicia sesión
 */
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
  // menuOptions = [
  //   { label: 'Editar', value: 'editar' },
  //   { label: 'Desapariciones', value: 'desapariciones' },
  //   { label: 'Seguimiento', value: 'seguimiento' },
  //   { label: 'Añadir', value: 'anyadir' },
  // ];//cambiar esto para que lo pueda recivir del padre
  @Input() menuOptions: { label: string, value: string }[] = [];
  @Input() iconMap: { [key: string]: string } = {};
  @Input() iconoUsuario: string = '';
  @Output() optionSelected = new EventEmitter<string>();

  constructor(private civilService: CivilService) {}

  ngOnInit() {
    this.civilService.civilMenu().subscribe(menu => this.menu = menu);
  }

  /**
   * Selecciona una opción del menú
   * @param option
   */
  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
  }
  // getIcon(value: string): string {
  //   switch (value) {
  //     case 'editar': return 'edit';
  //     case 'desapariciones': return 'search';
  //     case 'seguimiento': return 'track_changes';
  //     case 'anyadir': return 'add_circle';
  //     default: return 'help_outline';
  //   }
  // }
  /**
   * Devuelve el icono correspondiente a una opción del menú
   * @param value
   */
  getIcon(value: string): string {
    return this.iconMap[value] || 'help_outline';
  }
}
