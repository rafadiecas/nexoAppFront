import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {DesaparicionService} from '../../../servicios/desaparicion.service';
import {Router} from '@angular/router';
import {DesaparicionSinVerificar} from '../../../modelos/DesaparicionSinVerificar';

@Component({
  selector: 'app-lista-desapariciones-eliminadas',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgbPagination,
    TitleCasePipe
  ],
  templateUrl: './lista-desapariciones-eliminadas.component.html',
  styleUrl: './lista-desapariciones-eliminadas.component.css'
})
export class ListaDesaparicionesEliminadasComponent implements OnInit {

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

  cargaobjetos():void {
    this.desaparicionService.getEliminadas().subscribe((data: DesaparicionSinVerificar[]) => {
        this.noAprobadas = data;
        this.filteredItems = [...this.noAprobadas];
        this.setupPagination();
      },
      (error) => console.error('Error al cargar los datos', error)
    );
  }


  setupPagination(): void {
    const totalItems = this.filteredItems.length;
    const totalPagesCount = Math.ceil(totalItems / this.itemsPerPage);

    this.totalPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

    if (totalItems === 0) {
      this.paginatedItems = [];
    } else {
      this.changePage(1);
    }

    console.log('Paginación configurada:', {
      totalItems,
      totalPagesCount,
      paginatedItems: this.paginatedItems,
    });
  }

  onPageChange(page: number): void {
    this.changePage(page);
  }


  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;

    this.currentPage = page;

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  irDesaparicion(id: number | undefined): void {
    this.router.navigate(['/desaparicion', id]);
  }

  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredItems = this.noAprobadas.filter(item =>
      item.nombre?.toLowerCase().includes(text) ||
      item.dni?.toLowerCase().includes(text)
    );
    this.setupPagination();
  }

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

  confirmAction(action: string, item: any): void {
    if (action === 'recuperar') {
      this.desaparicionService.recuperarEliminacion(item.id).subscribe(
        () => {
          this.cargaobjetos();
        },
        (error) => console.error('Error al recuperar desaparición', error)
      );
    } else if (action === 'eliminar') {
      this.desaparicionService.eliminarDesaparicion(item.id).subscribe(
        () => {
          this.cargaobjetos();
        },
        (error) => console.error('Error al eliminar desaparición', error)
      );
    }
  }

}
