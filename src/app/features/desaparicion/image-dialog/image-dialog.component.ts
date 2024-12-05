import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * Componente que se encarga de mostrar un dialogo con una imagen de un comentario
 */
@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.css'
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}
}
