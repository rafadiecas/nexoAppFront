import { Component } from '@angular/core';
import {DesaparicionService} from '../../../../servicios/desaparicion.service';
import {DesaparicionComponent} from '../../../desaparicion/desaparicion.component';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {Persona} from '../../../../modelos/Persona';
import {FiltroService} from '../../../../servicios/filtro.service';
import {FiltroComponent} from '../../../filtro/filtro.component';
import {CommandModule} from '@angular/cli/src/command-builder/command-module';

@Component({
  selector: 'app-mostrarmas',
  standalone: true,
  imports: [
    FormsModule,
    FiltroComponent,
    DatePipe,
    CommonModule
  ],
  templateUrl: './mostrarmas.component.html',
  styleUrl: './mostrarmas.component.css'
})
export class MostrarmasComponent {
  personas: any[] = [];

  constructor(private filtroService: FiltroService) {}

  ngOnInit(): void {
    // Cargar todas las personas al inicio
    this.cargarPersonas({});
  }

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
      },
      (error) => {
        console.error('Error al cargar personas:', error);
      }
    );
  }

}
