import { Component } from '@angular/core';
import { FiltroService } from '../../../../servicios/filtro.service';
import { FiltroComponent } from '../../../filtro/filtro.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrarmas',
  standalone: true,
  imports: [
    FormsModule,
    FiltroComponent,
    DatePipe,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './mostrarmas.component.html',
  styleUrls: ['./mostrarmas.component.css'],
})
export class MostrarmasComponent {
  personas: any[] = []; // Todas las personas cargadas desde el servicio
  personasPaginadas: any[] = []; // Personas de la página actual
  paginaActual: number = 1; // Página actual
  itemsPorPagina: number = 8; // Elementos por página
  totalPaginas: number = 0; // Total de páginas disponibles
  mensajeError: string = ''; // Mensaje de error en caso de no encontrar resultados

  constructor(private filtroService: FiltroService) {}

  ngOnInit(): void {
    // Cargar todas las personas inicialmente
    this.cargarPersonas({});
  }

  cargarPersonas(filtros: any): void {
    console.log('Filtros enviados:', filtros); // Para depuración

    this.filtroService
      .buscarPorFiltros(
        filtros.estado || '',
        filtros.fecha || '',
        filtros.nombre || ''
      )
      .subscribe(
        (personas) => {
          console.log('Personas recibidas:', personas); // Depuración
          this.personas = personas;

          // Calcular total de páginas
          this.totalPaginas = Math.ceil(this.personas.length / this.itemsPorPagina);

          // Cargar la primera página
          this.cargarPagina(1);

          // Limpiar el mensaje de error si se encontraron resultados
          this.mensajeError = '';
        },
        (error) => {
          console.error('Error al cargar personas:', error);
          this.personas = [];
          this.personasPaginadas = [];
          this.totalPaginas = 0;

          // Verificar si el error es un 404 y mostrar un mensaje adecuado
          if (error.status === 404) {
            this.mensajeError = 'No se encontraron resultados para la búsqueda.';
          } else {
            this.mensajeError = 'Ocurrió un error al realizar la búsqueda. Inténtalo de nuevo.';
          }
        }
      );
  }

  cargarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return; // Validación de límites

    this.paginaActual = pagina;

    const inicio = (pagina - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.personasPaginadas = this.personas.slice(inicio, fin); // Asignar datos para la página actual
  }

  onFiltroAplicado(filtros: any): void {
    // Cuando se aplique un filtro, cargar personas según los filtros proporcionados
    this.cargarPersonas(filtros);
  }
}
