import { Component, OnInit } from '@angular/core';
import { DesaparicionService } from '../../servicios/desaparicion.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { DesaparicionPrincipal } from '../../modelos/DesaparicionPrincipal';
import { NgForOf, TitleCasePipe, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditaDialogComponent } from '../edita-dialog/edita-dialog.component';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {DesaparicionGestionDTO} from '../../modelos/DesaparicionGestionDTO';

@Component({
  selector: 'app-edita-desaparicion-autoridad',
  standalone: true,
  imports: [
    NgForOf,
    NgbPagination,
    ReactiveFormsModule,
    TitleCasePipe,
    FormsModule,
    NgIf,
    MatIcon
  ],
  templateUrl: './edita-desaparicion-autoridad.component.html',
  styleUrls: ['./edita-desaparicion-autoridad.component.css']
})
export class EditaDesaparicionAutoridadComponent implements OnInit {
  constructor(private desaparicionService: DesaparicionService, private dialog: MatDialog,private route:Router) {}

  desapariciones: DesaparicionGestionDTO[] = [];
  filteredItems: DesaparicionGestionDTO[] = [];
  paginatedItems: DesaparicionGestionDTO[] = [];
  filterText: string = '';
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalPages: number[] = [];

  ngOnInit(): void {
    this.cargaobjetos();
  }

  cargaobjetos(): void {
    this.desaparicionService.getDesaparicionGestion().subscribe(
      (data: DesaparicionPrincipal[]) => {
        console.log(data)
        this.desapariciones = data;
        this.filteredItems = [...this.desapariciones];
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

  irDesaparicion(desaparicion: DesaparicionGestionDTO): void {
    if (desaparicion.id !== undefined) {
      this.dialog.open(EditaDialogComponent, {
        width: '80%',
        data: { id: desaparicion.id },
      });
    } else {
      console.error('El ID de la desaparición es undefined.');
    }
  }

  redirect(id: number | undefined):void{
    if(id === undefined){
      console.error('El ID de la desaparición es undefined.');
      return;
    }
    this.route.navigate(['/desaparicion',id]);

  }

  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredItems = this.desapariciones.filter((item) =>
      item.nombre?.toLowerCase().includes(text) ||
      item.apellidos?.toLowerCase().includes(text)
    );
    this.setupPagination();
  }
}
