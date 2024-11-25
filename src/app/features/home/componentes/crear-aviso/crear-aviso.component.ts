import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AvisoService } from '../../../../servicios/aviso.service'; // Servicio para crear aviso
import { FileData } from '../../../../modelos/FileData';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import {LOCALE_ID} from '@angular/core';
import { InputShareComponent } from '../../../../shared/input-share/input-share.component';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Formato de fecha personalizado
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Formato de visualización
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthDayA11yLabel: 'DD MMMM',
  },
};
registerLocaleData(localeEs); // Registra la configuración regional para España


@Component({
  selector: 'app-crear-aviso',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputShareComponent,
  ],
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },{ provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class CrearAvisoComponent {
  avisoForm: FormGroup;
  archivos: File[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearAvisoComponent>,
    private avisoService: AvisoService
  ) {
    this.avisoForm = this.fb.group({
      texto: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });
  }

  // Maneja los cambios de archivos
  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map((fileData) => fileData.file as File);
  }

  // Crear aviso
  crearAviso() {
    if (this.avisoForm.invalid) {
      this.avisoForm.markAllAsTouched(); // Asegúrate de marcar todos los campos como tocados si el formulario es inválido
      return;
    }

    // Obtener los datos del formulario
    const avisoData = this.avisoForm.value;

    // Obtener la fecha en zona horaria local y convertirla a UTC
    const fechaLocal = new Date(avisoData.fecha);

    // Convertir la fecha a UTC sin perder el día (hora 00:00 UTC)
    const fechaUTC = new Date(Date.UTC(
      fechaLocal.getFullYear(),
      fechaLocal.getMonth(),
      fechaLocal.getDate(),
      0, 0, 0 // Establecer la hora a medianoche UTC
    ));

    // Convertir a formato ISO (YYYY-MM-DD)
    const fechaFormatoISO = fechaUTC.toISOString().split('T')[0];
    avisoData.fecha = fechaFormatoISO; // Asignar la fecha formateada al objeto

    // Crear FormData para enviar los datos
    const formData = new FormData();

    // Agregar el aviso como JSON stringificado
    formData.append('aviso', JSON.stringify(avisoData));

    // Agregar los archivos al FormData
    this.archivos.forEach((file) => {
      formData.append('files', file);  // Asegúrate de que los archivos se agreguen correctamente
    });

    // Verifica el contenido de formData (para debug)
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // Llamar al servicio para crear el aviso
    this.avisoService.crearAviso(formData).subscribe(
      (response) => {
        console.log('Aviso creado exitosamente', response);
        this.dialogRef.close(response);  // Cerrar el diálogo y devolver la respuesta

        // Recargar la página después de crear el aviso
        window.location.reload();  // Recarga la página para mostrar los cambios
      },
      (error) => {
        console.error('Error al crear el aviso', error);
        // Recargar la página después de crear el aviso
        // window.location.reload();  // Recarga la página para mostrar los cambios
      }
    );
  }
}
