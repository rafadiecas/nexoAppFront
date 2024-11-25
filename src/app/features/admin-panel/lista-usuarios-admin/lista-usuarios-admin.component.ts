import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {UsuarioListaAdmin} from '../../../modelos/UsuarioListaAdmin';
import {UsuarioService} from '../../../servicios/usuario.service';
import {NgModule} from '@angular/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  templateUrl: './lista-usuarios-admin.component.html',
  imports: [
    CommonModule,
    FormsModule,
    NgbPagination,
    NgbPaginationModule
  ],
  styleUrls: ['./lista-usuarios-admin.component.css']
})

export class AdminUsuariosComponent implements OnInit {
  usuarios: UsuarioListaAdmin[] = [];
  filteredUsuarios: UsuarioListaAdmin[] = [];
  paginatedUsuarios: UsuarioListaAdmin[] = [];
  filterText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number[] = [];
  accion: string = '';
  usuarioSeleccionado: UsuarioListaAdmin | null = null;

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuariosAdmin().subscribe(
      (data: UsuarioListaAdmin[]) => {
        this.usuarios = data;
        console.log(this.usuarios);
        this.filteredUsuarios = [...this.usuarios];
        this.setupPagination();
        this.cdRef.detectChanges(); // Forzar actualización de la vista
      },
      (error) => console.error('Error al cargar los usuarios', error)
    );
  }

  setupPagination(): void {
    const totalItems = this.filteredUsuarios.length;
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
    this.paginatedUsuarios = this.filteredUsuarios.slice(startIndex, endIndex);
    console.log('Usuarios paginados:', this.paginatedUsuarios); // Verifica que contenga datos
  }

  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(user =>
      user.usuario?.toLowerCase().includes(text)
    );
    this.setupPagination();
  }

  openModal(content: any, accion: string, usuario: UsuarioListaAdmin): void {
    this.accion = accion;
    this.usuarioSeleccionado = usuario;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          if (result === 'Confirmar') {
            this.confirmAction(accion, usuario);
          }
        },
        (reason) => {
          console.log('Modal cerrado:', reason);
        }
      );
  }

  confirmAction(action: string, usuario: UsuarioListaAdmin): void {
    if (action === 'eliminar' && usuario.id) {
      this.usuarioService.eliminarUsuario(usuario.id).subscribe(
        () => {
          this.cargarUsuarios();
        },
        (error) => console.error('Error al eliminar usuario', error)
      );
    }
  }
}
