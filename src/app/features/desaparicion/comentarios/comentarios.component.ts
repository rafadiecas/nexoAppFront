import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Comentario } from '../../../modelos/Comentario';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from '../../../servicios/comentario.service';
import { FileData } from '../../../modelos/FileData';
import { ComentarioListar } from '../../../modelos/ComentarioListar';
import {CommonModule} from '@angular/common';
import {InputShareComponent} from '../../../shared/input-share/input-share.component';
import {MatDialog} from '@angular/material/dialog';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';
import {DesaparicionLista} from '../../../modelos/DesaparicionLista';
import {CivilService} from '../../../servicios/civil.service';
import {ComentarioDialogComponent} from '../comentario-dialog/comentario-dialog.component';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputShareComponent, FormsModule, ],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarios: ComentarioListar[] = [];
  textoComentario = '';
  archivos: File[] = [];
  id?: number;
  desapariciones: DesaparicionLista[] = [];

  constructor(
    private comentarioService: ComentarioService,
    private dialog: MatDialog,
    private dialogImage: MatDialog,
    private route: ActivatedRoute,
    private civilService: CivilService
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarComentarios(this.id);
    this.civilService.listaDesapariciones().subscribe({
      next: (data) => {
        this.desapariciones = data;
        this.desapariciones = this.desapariciones.filter(desaparicion => desaparicion.id === this.id);
      },
      error: (err) => {
        console.error('Error al cargar desapariciones:', err);
      }
    });

  }


  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map(fileData => fileData.file as File);
  }

  cargarComentarios(desaparicionId: number): void {
    this.comentarioService.obtenerComentariosPorDesaparicion(desaparicionId).subscribe({
      next: data => {
        this.comentarios = data;
        this.comentarios = this.comentarios.reverse();
      },
      error: err => console.error('Error al cargar comentarios:', err)
    });
  }


  abrirDialogo(): void {
    if (!this.textoComentario) {
      console.error('El texto del comentario es obligatorio.');
      return;
    }

    const dialogRef = this.dialog.open(ComentarioDialogComponent, {
      width: "80%",
      data: { nombre: '', email: '', telefono: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enviarComentario(result);
      }
    });
  }

  abrirDialogoImagen(foto:string): void {

    this.dialogImage.open(ImageDialogComponent, {
      width: "80%",
      data: { imageUrl:foto  }
    });

  }


  enviarComentario(datosAdicionales: any): void {
    const nuevoComentario = {
      texto: this.textoComentario,
      desaparicionId: this.id,
      ...datosAdicionales
    };

    this.comentarioService.crearComentario(nuevoComentario, this.archivos).subscribe({
      next: response => {
        console.log('Comentario creado:', response);
        this.cargarComentarios(this.id!);
        this.textoComentario = '';
        this.archivos = [];
      },
      error: err => console.error('Error al crear comentario:', err)
    });
  }
}
