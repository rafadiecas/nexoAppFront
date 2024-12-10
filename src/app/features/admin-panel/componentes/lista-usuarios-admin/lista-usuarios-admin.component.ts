import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {UsuarioListaAdmin} from '../../../../modelos/UsuarioListaAdmin';
import {UsuarioService} from '../../../../servicios/usuario.service';
import {NgModule} from '@angular/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

/**
 * Componente que gestiona la lista de usuarios para el administrador.
 */
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

  /**
   * Carga los usuarios de la base de datos.
   */
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

  /**
   * Configura la paginación de los usuarios.
   */
  setupPagination(): void {
    const totalItems = this.filteredUsuarios.length;
    const totalPagesCount = Math.ceil(totalItems / this.itemsPerPage);
    this.totalPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);
    this.changePage(1);
  }

  /**
   * Cambia la página de la paginación.
   * @param page
   */
  onPageChange(page: number): void {
    this.changePage(page);
  }

  /**
   * Cambia la página de la paginación.
   * @param page
   */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages.length) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsuarios = this.filteredUsuarios.slice(startIndex, endIndex);
    console.log('Usuarios paginados:', this.paginatedUsuarios); // Verifica que contenga datos
  }

  /**
   * Aplica un filtro a los usuarios por username
   */
  applyFilter(): void {
    const text = this.filterText.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(user =>
      user.usuario?.toLowerCase().includes(text)
    );
    this.setupPagination();
  }

  /**
   * Abre un modal para confirmar una acción.
   * @param content
   * @param accion
   * @param usuario
   */
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

  /**
   * Confirma la acción de eliminar un usuario.
   * @param action
   * @param usuario
   */
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
