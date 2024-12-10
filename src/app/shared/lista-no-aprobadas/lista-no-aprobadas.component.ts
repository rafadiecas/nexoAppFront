import {Component, HostListener, OnInit} from '@angular/core';
import {DesaparicionService} from '../../servicios/desaparicion.service';
import {DesaparicionIndividual} from '../../modelos/DesaparicionIndividual';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {LugarService} from '../../servicios/lugar.service';
import {DesaparicionSinVerificar} from '../../modelos/DesaparicionSinVerificar';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

/**
 * Componente que muestra una lista de desapariciones no aprobadas.
 */
@Component({
  selector: 'app-lista-no-aprobadas',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgbPagination,
    TitleCasePipe,
    NgIf,
    MatIcon
  ],
  templateUrl: './lista-no-aprobadas.component.html',
  styleUrl: './lista-no-aprobadas.component.css'
})
export class ListaNoAprobadasComponent implements OnInit {

  constructor(private desaparicionService: DesaparicionService, private modalService:NgbModal, private router:Router) { }
  noAprobadas: DesaparicionSinVerificar[] = [];
  filteredItems: DesaparicionSinVerificar[] = [];
  paginatedItems: DesaparicionSinVerificar[] = [];

  filterText: string = '';
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalPages: number[] = [];
  accion: string = '';
  itemSeleccionado: any = null;


  ngOnInit(): void {
    this.cargaobjetos();
  }

  /**
   * Carga las desapariciones no aprobadas de la base de datos.
   */
  cargaobjetos():void {
    this.desaparicionService.getNoAprobadas().subscribe((data: DesaparicionSinVerificar[]) => {
      this.noAprobadas = data;
      this.filteredItems = [...this.noAprobadas];
      this.setupPagination();
      },
      (error) => console.error('Error al cargar los datos', error)
    );
  }

  /**
   * Configura la paginación.
   */
  setupPagination(): void {
    const totalItems = this.filteredItems.length;
    const totalPagesCount = Math.ceil(totalItems / this.itemsPerPage);

    this.totalPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);
    this.changePage(1);
  }

  /**
   * Cambia de página.
   * @param page
   */
  onPageChange(page: number): void {
    this.changePage(page);
  }

  /**
   * Cambia de página.
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
   * Redirige a la página de desaparición.
   * @param id
   */
  irDesaparicion(id: number | undefined): void {
    this.router.navigate(['/desaparicion', id]);
  }

  /**
   * Aplica el filtro de búsqueda.
   */
  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredItems = this.noAprobadas.filter(item =>
      item.nombre?.toLowerCase().includes(text) ||
      item.dni?.toLowerCase().includes(text)
    );
    this.setupPagination();
  }

  /**
   * Abre el modal de confirmación.
   * @param content
   * @param action
   * @param item
   */
  openModal(content: any, action: string, item: any): void {
    this.accion = action;
    this.itemSeleccionado = item;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          if (result === 'Confirmar') {
            this.confirmAction(action, item);
          }
        },
        (reason) => {
          console.log('Modal cerrado:', reason);
        }
      );
  }

  /**
   * Confirma la acción y procede a ajecutar las funciones necesarias, en este caso aprobar o rechazar una desaparición.
   * @param action
   * @param item
   */
  confirmAction(action: string, item: any): void {
    if (action === 'aprobar') {
      this.desaparicionService.aprobarDesaparicion(item.id).subscribe(
        () => {
          this.cargaobjetos();
        },
        (error) => console.error('Error al aprobar desaparición', error)
      );
    } else if (action === 'denegar') {
      this.desaparicionService.rechazarDesaparicion(item.id).subscribe(
        () => {
          this.cargaobjetos();
        },
        (error) => console.error('Error al denegar desaparición', error)
      );
    }
  }

}
