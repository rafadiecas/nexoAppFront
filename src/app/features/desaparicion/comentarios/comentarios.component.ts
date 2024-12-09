import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
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
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsuarioService} from '../../../servicios/usuario.service';
import {MatIcon} from '@angular/material/icon';
import {AuthServiceService} from '../../../core/auth-service.service';
import {DenunciaComentario} from '../../../modelos/DenunciaComentario';
/**
 * Componente que se encarga de mostrar los comentarios de una desaparición
 */
@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputShareComponent, FormsModule, MatIcon,],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @ViewChild(InputShareComponent) inputShareComponent!: InputShareComponent;
  comentarios: ComentarioListar[] = [];
  usuarioAutenticado: boolean = false;
  textoComentario = '';
  archivos: File[] = [];
  id?: number;
  desapariciones: DesaparicionLista[] = [];
  rol: string = "";
  private snackBar = inject(MatSnackBar);

  constructor(
    private comentarioService: ComentarioService,
    private dialog: MatDialog,
    private dialogImage: MatDialog,
    private route: ActivatedRoute,
    private civilService: CivilService,
    private usuarioService: UsuarioService,
    private authService: AuthServiceService,
  ) {}

  ngOnInit(): void {
  this.usuarioAutenticado = this.usuarioService.estaAutenticado();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarComentarios(this.id);
    this.authService.obtenerRol().subscribe((rol: string) => {
      this.rol = rol;
    });
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

  /**
   * Método que se encarga de manejar el evento de adición de imágenes
   * @param filesData
   */
  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map(fileData => fileData.file as File);
  }

  /**
   * Método que se encarga de cargar los comentarios de una desaparición
   * @param desaparicionId
   */
  cargarComentarios(desaparicionId: number): void {
    this.comentarioService.obtenerComentariosPorDesaparicion(desaparicionId).subscribe({
      next: data => {
        this.comentarios = data;
        this.comentarios = this.comentarios.reverse();
      },
      error: err => console.error('Error al cargar comentarios:', err)
    });
  }

  /**
   * Método que se encarga de abrir un dialogo para agregar un comentario
   */
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

  /**
   * Método que se encarga de abrir un dialogo para mostrar una imagen de un comentario
   * @param foto
   */
  abrirDialogoImagen(foto:string): void {

    this.dialogImage.open(ImageDialogComponent, {
      width: "80%",
      data: { imageUrl:foto  }
    });

  }

  /**
   * Método que se encarga de enviar un comentario
   * @param datosAdicionales
   */
  enviarComentario(datosAdicionales: any): void {
    const nuevoComentario = {
      texto: this.textoComentario,
      desaparicionId: this.id,
      ...datosAdicionales
    };
    console.log(this.archivos)

    this.comentarioService.crearComentario(nuevoComentario, this.archivos).subscribe({
      next: response => {
        console.log('Comentario creado:', response);
        this.cargarComentarios(this.id!);
        this.textoComentario = '';
        this.archivos = [];
        this.inputShareComponent.clearFiles();
        this.snackBar.open('Comentario creado con exito', 'Cerrar', {
          duration: 3000
        });
      },
      error: err => console.error('Error al crear comentario:', err)
    });
  }

  /**
   * Método que se encarga de denunciar un comentario
   * @param comentario
   */
  denunciarComentario(comentario: any): void {
    const denuncia: DenunciaComentario = {
      idDesaparicion: this.id!,
      texto: comentario.texto
    }
    this.comentarioService.denunciarComentario(denuncia).subscribe({
      next: response => {
        console.log('Denuncia realizada:', response);
        this.snackBar.open('Denuncia realizada con exito', 'Cerrar', {
          duration: 3000
        });
      },
      error: err => console.error('Error al denunciar comentario:', err)
    })
  }

  eliminarComentario(comentario: any): void {
    console.log(comentario.id);
    this.comentarioService.eliminarComentario(comentario.id!).subscribe({
      next: response => {
        console.log('Comentario eliminado:', response);
        this.cargarComentarios(this.id!);
        this.snackBar.open('Comentario eliminado con exito', 'Cerrar', {
          duration: 3000
        });
      },
      error: err => console.error('Error al eliminar comentario:', err)
    });
  }
}
