import {Component, Input} from '@angular/core';
import {ComentarioService} from '../../../../../servicios/ComentarioService';
import {Comentario} from '../../../../../modelos/Comentario';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  comentarios: Comentario[] = [];
  mostrarCajon: boolean = false;
  @Input() desaparicionId: number = 0;

  nuevoComentario: Comentario = {
    nombre: '',
    email: '',
    telefono: null,
    texto: '',
    desaparicionId:0
  };

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    const desaparicionId = 1;
    this.cargarComentarios(desaparicionId);
  }

  /**
   * Carga los comentarios de una desaparición específica.
   * @param desaparicionId ID de la desaparición.
   */
  cargarComentarios(desaparicionId: number): void {
    this.comentarioService.obtenerComentariosPorDesaparicion(desaparicionId).subscribe({
      next: (data) => {
        this.comentarios = data;
        console.log('Comentarios cargados:', this.comentarios);
      },
      error: (err) => {
        console.error('Error al cargar comentarios:', err);
      },
    });
  }
  abrirCajon(): void {
    this.mostrarCajon = true;
  }

  cerrarCajon(): void {
    this.mostrarCajon = false;
  }
  agregarComentario(): void {
    this.comentarioService.agregarComentario(this.nuevoComentario).subscribe({
      next: (data) => {
        console.log('Comentario agregado:', data);
        this.comentarios.push(data);
        this.cerrarCajon();
      },
      error: (err) => {
        console.error('Error al agregar comentario:', err);
      }
    });
  }

  enviarComentario(): void {
    this.nuevoComentario.desaparicionId = this.desaparicionId;
    this.comentarioService.agregarComentario(this.nuevoComentario).subscribe({
      next: (comentario) => {
        console.log('Comentario creado:', comentario);
        this.comentarios.push(comentario);
        this.nuevoComentario = { nombre: '', email: '', telefono: null, texto: '', desaparicionId: 0 };
      },
      error: (err) => {
        console.error('Error al crear el comentario:', err);
      },
    });
  }
  crearComentario(comentario: Comentario, files: File[]) {
    this.comentarioService.crearComentario(comentario, files).subscribe(
      (response) => {
        console.log('Comentario creado exitosamente', response);
      },
      (error) => {
        console.error('Error al crear comentario', error);
      }
    );
  }

  // Enviar comentario con archivos
  enviarComentarioConArchivos(files: File[]): void {
    this.nuevoComentario.desaparicionId = this.desaparicionId;
    this.crearComentario(this.nuevoComentario, files);
  }


}
