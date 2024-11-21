import {Component, OnInit} from '@angular/core';
import {DesaparicionService} from '../../../../servicios/desaparicion.service';
import {DesaparicionIndividual} from '../../../../modelos/DesaparicionIndividual';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {LugarService} from '../../../../servicios/lugar.service';
import {DesaparicionSinVerificar} from '../../../../modelos/DesaparicionSinVerificar';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lista-no-aprobadas',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgbPagination,
    TitleCasePipe,
    NgIf
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
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number[] = [];
  accion: string = '';
  itemSeleccionado: any = null;


  ngOnInit(): void {
    this.cargaobjetos();
  }

  cargaobjetos():void {
    this.desaparicionService.getNoAprobadas().subscribe((data: DesaparicionSinVerificar[]) => {
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
    this.changePage(1);
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
    if (action === 'aprobar') {
      this.desaparicionService.aprobarDesaparicion(item.id)
    } else if (action === 'denegar') {
      this.desaparicionService.rechazarDesaparicion(item.id);
    }
    this.cargaobjetos();
  }

}
