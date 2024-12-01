import { Component } from '@angular/core';
import {DesaparicionService} from '../../../../servicios/desaparicion.service';
import {DesaparicionComponent} from '../../../desaparicion/desaparicion.component';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {Persona} from '../../../../modelos/Persona';
import {FiltroService} from '../../../../servicios/filtro.service';
import {FiltroComponent} from '../../../filtro/filtro.component';
import {CommandModule} from '@angular/cli/src/command-builder/command-module';
import {RouterLink} from '@angular/router';

/**
 * Componente que muestra más información sobre las desapariciones
 */
@Component({
  selector: 'app-mostrarmas',
  standalone: true,
  imports: [
    FormsModule,
    FiltroComponent,
    DatePipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './mostrarmas.component.html',
  styleUrl: './mostrarmas.component.css'
})
export class MostrarmasComponent {
  personas: any[] = []; // Todas las personas cargadas
  personasPaginadas: any[] = []; // Personas mostradas en la página actual
  paginaActual: number = 1; // Página actual
  itemsPorPagina: number = 8; // Personas por página
  totalPaginas: number = 0; // Total de páginas
  paginas: number[] = []; // Lista de números de página
  constructor(private filtroService: FiltroService) {}

  ngOnInit(): void {
    // Cargar todas las personas al inicio
    this.cargarPersonas({});

  }

  /**
   * Cargar la página indicada
   * @param pagina
   */
  cargarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return; // Validar límites

    this.paginaActual = pagina;

    // Calcular las personas para esta página
    const inicio = (pagina - 1) * this.itemsPorPagina; // Índice inicial
    const fin = inicio + this.itemsPorPagina; // Índice final
    this.personasPaginadas = this.personas.slice(inicio, fin); // Asignar personas paginadas
  }

  /**
   * Cargar personas según los filtros
   * @param filtros
   */
  cargarPersonas(filtros: any): void {
    console.log('Filtros enviados:', filtros); // Verifica los filtros
    this.filtroService.buscarPorFiltros(
      filtros.estado || '',
      filtros.fecha || '',
      filtros.nombre || ''
    ).subscribe(
      (personas) => {
        console.log('Personas recibidas:', personas); // Verifica los datos recibidos
        this.personas = personas;

        // Calcular total de páginas
        this.totalPaginas = Math.ceil(this.personas.length / this.itemsPorPagina);

        // Cargar la primera página
        this.cargarPagina(1);
      },
      (error) => {
        console.error('Error al cargar personas:', error);
      }
    );
  }


  protected readonly RouterLink = RouterLink;
}
