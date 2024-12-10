import {Component, EventEmitter, Output} from '@angular/core';
import {Sexo} from '../../modelos/Sexo';
import {FiltroService} from '../../servicios/filtro.service';
import {FormsModule} from '@angular/forms';
import {Estado} from '../../modelos/Estado';
import {CommonModule} from '@angular/common';

/**
 * Componente que permite filtrar las desapariciones
 */
@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Output() buscar = new EventEmitter<any>();

  // Filtros seleccionados
  filtros = {
    nombre: '',
    estado: '',
    fecha: ''
  };

  // Lista de estados generada dinámicamente
  estados: { id: string; nombre: string }[] = [];

  ngOnInit(): void {
    this.cargarEstados();
  }

  /**
   * Carga los estados en el select
   */
  cargarEstados(): void {
    this.estados = Object.keys(Estado).map(key => ({
      id: Estado[key as keyof typeof Estado],
      nombre: Estado[key as keyof typeof Estado]
    }));
  }

  /**
   * Emite el evento de buscar con los filtros seleccionados
   */
  onBuscar(): void {
    this.buscar.emit(this.filtros);
  }

  /**
   * Limpia los filtros
   */
  onLimpiar(): void {
    this.filtros = {
      nombre: '',
      estado: '',
      fecha: ''
    };
    this.buscar.emit(this.filtros);
  }

}
