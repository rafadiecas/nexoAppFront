import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Comentario } from '../../../modelos/Comentario';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from '../../../servicios/comentario.service';
import { FileData } from '../../../modelos/FileData';
import { ComentarioListar } from '../../../modelos/ComentarioListar';
import {CommonModule} from '@angular/common';
import {InputShareComponent} from '../../../shared/input-share/input-share.component';
import {MatDialog} from '@angular/material/dialog';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputShareComponent],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarios: ComentarioListar[] = [];
  id?: number;
  private archivos: File[] = [];
  comentarioForm!: FormGroup;

  constructor(
    private comentarioService: ComentarioService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarComentarios(this.id);
    this.inicializarFormulario();
  }

  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
      width: '80%',
      maxWidth: '600px'
    });
  }

  /**
   * Inicializa el formulario reactivo con sus validaciones.
   */
  inicializarFormulario(): void {
    this.comentarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [null],
      texto: ['', [Validators.required]]
    });
  }

  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map(fileData => fileData.file as File);
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
      }
    });
  }

  enviarComentario(): void {
    if (this.comentarioForm.invalid) {
      this.comentarioForm.markAllAsTouched();
      return;
    }

    const nuevoComentario: Comentario = {
      ...this.comentarioForm.value,
      desaparicionId: this.id!
    };

    this.comentarioService.crearComentario(nuevoComentario, this.archivos).subscribe({
      next: (response) => {
        console.log('Comentario creado:', response);
        this.cargarComentarios(this.id!);
        this.comentarioForm.reset();
        this.archivos = [];
      },
      error: (error) => console.error('Error al crear el comentario:', error)
    });
  }
}
