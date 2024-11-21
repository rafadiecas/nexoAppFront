import {Component, OnInit} from '@angular/core';
import {CivilConfirmar} from '../../../../modelos/CivilConfirmar';
import {CivilService} from '../../../../servicios/civil.service';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

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
  constructor(private servicio: CivilService) {
  }
  ngOnInit(){
    this.servicio.listaCivilSinVer().subscribe({
      next: (data) => {
        this.civilSinVer = data; // Manejo de datos recibidos
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
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;

    this.currentPage = page;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }
  setupPagination(): void {
    const totalItems = this.filteredItems.length;
    const totalPagesCount = Math.ceil(totalItems / this.itemsPerPage);

    this.totalPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);
    this.changePage(1);
  }
  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredItems = this.civilSinVer.filter(item =>
      item.nombre?.toLowerCase().includes(text) ||
      item.apellido?.toLowerCase().includes(text) ||
      item.dni?.toLowerCase().includes(text)
    );
    this.setupPagination();
  }
}
