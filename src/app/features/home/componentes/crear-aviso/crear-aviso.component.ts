import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FileData} from '../../../../modelos/FileData';
import {InputFotosComponent} from '../../../perfil-usuario/componentes/input-fotos/input-fotos.component';
import {InputShareComponent} from '../../../../shared/input-share/input-share.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthDayA11yLabel: 'DD MMMM',
  },
};


@Component({
  selector: 'app-crear-aviso',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, InputFotosComponent,
    InputShareComponent, MatDatepickerInput,
    MatDatepickerToggle, MatDatepicker,MatNativeDateModule,
    MatDatepickerModule],
  templateUrl: './crear-aviso.component.html',
  styleUrl: './crear-aviso.component.css',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],

})
export class CrearAvisoComponent {
  avisoForm: FormGroup;
  archivos: File[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearAvisoComponent>
  ) {
    this.avisoForm = this.fb.group({
      texto: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      id_usuario: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],


    });
  }
  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map(fileData => fileData.file as File);
  }



  crearAviso() {
    if (this.avisoForm.valid) {
      const nuevoAviso = this.avisoForm.value;
      nuevoAviso.fecha = nuevoAviso.fecha.toISOString().split('T')[0]; // Fecha en formato String (yyyy-MM-dd)
      this.dialogRef.close(nuevoAviso); // Devuelve los datos del formulario
    }
  }

  onSubmit(): void {
    if (this.avisoForm.invalid) {
      this.avisoForm.markAllAsTouched();
      return;
    }

    const avisoData = this.avisoForm.value;
    const formData = new FormData();
    formData.append('aviso', JSON.stringify(avisoData));

    this.archivos.forEach(file => {
      formData.append('files', file);
    });
  }
}
