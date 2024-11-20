import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFotosComponent } from '../input-fotos/input-fotos.component';
import { LocalizacionComponent } from '../localizacion/localizacion.component'; // Importamos LocalizacionComponent
import { FileData } from '../../../../modelos/FileData';
import { Sexo } from '../../../../modelos/Sexo'; // Importamos el enum Sexo
import { Complexion } from '../../../../modelos/Complexion';
import {NgForOf} from '@angular/common';
import {DesaparicionService} from '../../../../servicios/desaparicion.service'; // Importamos el enum Complexion

@Component({
  selector: 'app-crear-desaparicion',
  templateUrl: './crear-desaparicion.component.html',
  imports: [
    ReactiveFormsModule,
    InputFotosComponent,
    LocalizacionComponent,
    NgForOf,
    // Agregamos LocalizacionComponent
  ],
  standalone: true
})
export class DesaparicionFormComponent {
  desaparicionForm: FormGroup;
  archivos: File[] = [];
  sexoOptions = Object.values(Sexo); // Obtenemos las opciones del enum Sexo
  complexionOptions = Object.values(Complexion); // Obtenemos las opciones del enum Complexion

  constructor(private fb: FormBuilder, private desaparicionService: DesaparicionService) {
    this.desaparicionForm = this.fb.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_usuario: ['', Validators.required],
      personaDTO: this.fb.group({
        dni: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        sexo: ['', Validators.required], // Utilizamos las opciones del enum Sexo
        altura: [null, Validators.required],
        complexion: ['', Validators.required], // Utilizamos las opciones del enum Complexion
        descripcion: [''],
      }),
      lugarDTO: this.fb.group({
        provincia: [''], // Se gestionará con LocalizacionComponent
        localidad: [''], // Se gestionará con LocalizacionComponent
        calle: [''],     // Se gestionará con LocalizacionComponent
      }),
    });
  }

  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map(fileData => fileData.file as File);
  }

  // Método que recibe los cambios desde LocalizacionComponent
  onAddressChanged(address: any): void {
    this.desaparicionForm.get('lugar')?.patchValue(address);
  }

  onSubmit(): void {
    if (this.desaparicionForm.invalid) {
      this.desaparicionForm.markAllAsTouched();
      return;
    }

    const desaparicionData = this.desaparicionForm.value;
    const formData = new FormData();
    formData.append('desaparicion', JSON.stringify(desaparicionData));

    this.archivos.forEach(file => {
      formData.append('files', file);
    });

    this.desaparicionService.guardarDesaparicion(formData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al guardar la desaparición:', error);
        // Maneja el error según sea necesario
      }
    });

    console.log('Datos de desaparición enviados:', formData);
    // Aquí realiza la petición HTTP usando un servicio HttpClient
    // this.http.post('/guardar', formData).subscribe(response => console.log(response));
  }
}
