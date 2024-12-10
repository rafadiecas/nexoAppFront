import { Component, OnInit } from '@angular/core';
import {AvisoService} from '../../../../servicios/aviso.service';
import {CommonModule} from '@angular/common';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Aviso} from '../../../../modelos/Aviso';
import {MatIcon} from "@angular/material/icon";

/**
 * Componente que contiene la lista de avisos para una autoridad y su gestion
 */
@Component({
  selector: 'app-autoridad-avisos',
  standalone: true,
  templateUrl: './autoridad-avisos.component.html',
    imports: [
        NgbPagination,
        DatePipe,
        FormsModule, CommonModule, MatIcon
    ],
  styleUrls: ['./autoridad-avisos.component.css']
})
export class AutoridadAvisosComponent implements OnInit {
  avisos: Aviso[] = [];
  filteredAvisos: Aviso[] = [];
  paginatedAvisos: Aviso[] = [];
  filterText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number[] = [];
  accion: string = '';
  itemSeleccionado: Aviso | null = null;

  constructor(private avisoService: AvisoService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.cargarAvisos();

  }

  /**
   * Carga los avisos de la bbdd
   */
  cargarAvisos(): void {
    this.avisoService.getAvisosAutoridad().subscribe((data: Aviso[]) => {
        this.avisos = data;
        console.log(this.avisos)
        this.filteredAvisos = [...this.avisos];
        this.setupPagination();
      },
      (error) => console.error('Error al cargar los avisos', error));
  }

  /**
   * Configura la paginación de los avisos
   */
  setupPagination(): void {
    const totalItems = this.filteredAvisos.length;
    const totalPagesCount = Math.ceil(totalItems / this.itemsPerPage);
    this.totalPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);
    this.changePage(1);
  }

  /**
   * Cambia de página
   * @param page
   */
  onPageChange(page: number): void {
    this.changePage(page);
  }

  /**
   * Cambia de página
   * @param page
   */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAvisos = this.filteredAvisos.slice(startIndex, endIndex);
  }

  /**
   * Filtra los avisos
   */
  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredAvisos = this.avisos.filter(item =>
      item.username?.toString().toLowerCase().includes(text)
    );
    this.setupPagination();
  }

  /**
   * Abre un modal
   * @param content
   * @param accion
   * @param item
   */
  openModal(content: any, accion: string, item: Aviso): void {
    this.accion = accion;
    this.itemSeleccionado = item;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          if (result === 'Confirmar') {
            this.confirmAction(accion, item);
          }
        },
        (reason) => {
          console.log('Modal cerrado:', reason);
        }
      );
  }

  /**
   * Confirma una acción, en este caso eliminar un aviso
   * @param action
   * @param item
   */
  confirmAction(action: string, item: Aviso): void {
    if (action === 'eliminar' && item.id) {
      this.avisoService.eliminarAviso(item.id).subscribe(
        (respuesta) => {
          console.log(respuesta);
          this.cargarAvisos();
        },
        (error) => console.error('Error al eliminar aviso', error)
      );
    }
  }
}
