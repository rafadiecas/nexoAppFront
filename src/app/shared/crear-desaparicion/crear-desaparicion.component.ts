import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFotosComponent } from '../../features/perfil-usuario/componentes/input-fotos/input-fotos.component';
import { LocalizacionComponent } from '../../features/perfil-usuario/componentes/localizacion/localizacion.component'; // Importamos LocalizacionComponent
import { FileData } from '../../modelos/FileData';
import { Sexo } from '../../modelos/Sexo'; // Importamos el enum Sexo
import { Complexion } from '../../modelos/Complexion';
import {NgForOf} from '@angular/common';
import {DesaparicionService} from '../../servicios/desaparicion.service'; // Importamos el enum Complexion
import {CommonModule} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-desaparicion',
  templateUrl: './crear-desaparicion.component.html',
  imports: [
    ReactiveFormsModule,
    InputFotosComponent,
    LocalizacionComponent,
    NgForOf,
    CommonModule
    // Agregamos LocalizacionComponent
  ],
  standalone: true
})
export class DesaparicionFormComponent {
  desaparicionForm: FormGroup;
  archivos: File[] = [];
  sexoOptions = Object.values(Sexo); // Obtenemos las opciones del enum Sexo
  complexionOptions = Object.values(Complexion); // Obtenemos las opciones del enum Complexion
  currentStep = 0;
  steps = ['Paso 1', 'Paso 2', 'Paso 3', 'Paso 4']
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private desaparicionService: DesaparicionService) {
    this.desaparicionForm = this.fb.group({
      fecha: [],
      descripcion: [],
      id_usuario: [],
      personaDTO: this.fb.group({
        dni: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        sexo: ['', Validators.required],
        altura: [null, Validators.required],
        complexion: ['', Validators.required],
        descripcion: [''],
      }),
      lugarDTO: this.fb.group({
        provincia: [''],
        localidad: [''],
        calle: [''],
      }),
    });

  }

  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map(fileData => fileData.file as File);
  }

  onAddressChanged(address: any): void {
    this.desaparicionForm.get('lugarDTO')?.patchValue(address);
  }

  nextStep() {
    if (this.currentStep === 0) {
      this.currentStep++;
      return;
    }

    const currentFormGroup = this.getCurrentStepGroup();
    if (currentFormGroup && currentFormGroup.valid) {
      this.currentStep++;
    } else {
      currentFormGroup?.markAllAsTouched();
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    const formValid = this.getCurrentStepGroup()?.valid ?? true;
    if (step <= this.currentStep || formValid) {
      this.currentStep = step;
    } else {
      this.getCurrentStepGroup()?.markAllAsTouched();
    }
  }

  getCurrentStepGroup(): FormGroup | null {
    switch (this.currentStep) {
      case 0: return this.desaparicionForm; // Incluye los campos fecha, descripcion, id_usuario
      case 1: return this.desaparicionForm.get('personaDTO') as FormGroup;
      case 2: return this.desaparicionForm.get('lugarDTO') as FormGroup;
      default: return null;
    }
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
        this.snackBar.open('Desaparicion creada con éxito', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Error al guardar la desaparición:', error);
        this.snackBar.open('Error al crear la desaparicion', 'Cerrar', {
          duration: 3000
        });
      }
    });

    console.log('Datos de desaparición enviados:', formData);


  }

}
