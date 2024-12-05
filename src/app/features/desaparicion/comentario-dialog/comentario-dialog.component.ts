import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

/**
 * Componente que se encarga de mostrar un dialogo para agregar un comentario
 */
@Component({
  selector: 'app-comentario-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    NgIf
  ],
  templateUrl: './comentario-dialog.component.html',
  styleUrl: './comentario-dialog.component.css'
})
export class ComentarioDialogComponent {
  dialogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ComentarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['']
    });
  }

  /**
   * Método que se encarga de guardar el comentario
   */
  guardar(): void {
    if (this.dialogForm.valid) {
      this.dialogRef.close(this.dialogForm.value);
    }
  }
}
