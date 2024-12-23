import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CivilConfirmar} from '../../../../modelos/CivilConfirmar';
import {CivilService} from '../../../../servicios/civil.service';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {UsuarioService} from '../../../../servicios/usuario.service';

/**
 * Componente que contiene la lista de usuarios civiles sin verificar y su gestión
 */
@Component({
  selector: 'app-gestion-usuario',
  standalone: true,
  imports: [
    NgForOf,
    NgbPagination,
    ReactiveFormsModule,
    TitleCasePipe,
    FormsModule,
    MatIcon
  ],
  templateUrl: './gestion-usuario.component.html',
  styleUrl: './gestion-usuario.component.css'
})
export class GestionUsuarioComponent implements OnInit{
  civilSinVer: CivilConfirmar[] = [];
  filteredItems: CivilConfirmar[] = [];
  paginatedItems: CivilConfirmar[] = [];
  filterText: string = '';
  itemsPerPage: number = 6;
  totalPages: number[] = [];
  currentPage: number = 1;
  constructor(private servicio: CivilService, private usuarioServicio: UsuarioService, private cdr: ChangeDetectorRef) {
  }

  /**
   * Carga los usuarios civiles sin verificar de la bbdd
   */
  cargaDatos(){
    this.servicio.listaCivilSinVer().subscribe({
      next: (data) => {
        this.civilSinVer = data;
        console.log(data);
        this.filteredItems = [...this.civilSinVer];
        this.setupPagination();
      },
      error: (err) => {
        console.error('Error al cargar la lista:', err); // Manejo de errores
      },
      complete: () => {
        console.log('La solicitud ha finalizado con éxito.'); // Acción al completarse

      }
    });
  }
  ngOnInit(){
    this.cargaDatos();
  }

  /**
   * Cambia la página de la paginación
   * @param page
   */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;

    this.currentPage = page;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  /**
   * Configura la paginación de los usuarios
   */
  setupPagination(): void {
    const totalItems = this.filteredItems.length;
    const totalPagesCount = Math.ceil(totalItems / this.itemsPerPage);

    this.totalPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);
    this.changePage(1);
  }

  /**
   * Aplica el filtro por nombre, apellido o dni
   */
  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredItems = this.civilSinVer.filter(item =>
      item.nombre?.toLowerCase().includes(text) ||
      item.apellido?.toLowerCase().includes(text) ||
      item.dni?.toLowerCase().includes(text)
    );
    this.setupPagination();
  }

  /**
   * Verifica un usuario civil
   * @param idUsuario
   */
  verificaUsuario(idUsuario: number) {
    this.usuarioServicio.verificaUsuario(idUsuario).subscribe({
      next: (respuesta) =>{
        console.log(respuesta);
        this.civilSinVer = this.civilSinVer.filter(item => item.idUsuario !== idUsuario);
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error al vericar:', err); // Manejo de errores
      },
      complete: () => {
        console.log('La solicitud ha finalizado con éxito.');
        this.cdr.detectChanges();
        // Acción al completarse
      }
    });
  }

  /**
   * Elimina un usuario civil
   * @param idUsuario
   */
  eliminaUsuario(idUsuario: number) {
    this.usuarioServicio.eliminaUsuario(idUsuario).subscribe({
      next: (respuesta) =>{
        console.log(respuesta);
        // Eliminar usuario de la lista
        this.civilSinVer = this.civilSinVer.filter(item => item.idUsuario !== idUsuario);

        // Actualizar las listas y la paginación
        this.applyFilter(); // Reaplicar filtros
      },
      error: (err) => {
        console.error('Error al eliminar:', err); // Manejo de errores
      },
      complete: () => {
        console.log('La solicitud ha finalizado con éxito.');
        this.cdr.detectChanges();
        // Acción al completarse
      }
    });
  }
}
