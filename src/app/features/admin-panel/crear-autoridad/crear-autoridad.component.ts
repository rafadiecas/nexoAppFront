import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AutoridadService} from '../../../servicios/autoridad.service';

@Component({
  selector: 'app-crear-autoridad',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './crear-autoridad.component.html',
  styleUrls: ['./crear-autoridad.component.css'],
})
export class CrearAutoridadComponent implements OnInit {
  autoridadForm: FormGroup;

  constructor(private fb: FormBuilder, private autoridadService: AutoridadService) {
    this.autoridadForm = this.fb.group({}); // Inicialización segura
  }

  ngOnInit(): void {
    this.autoridadForm = this.fb.group({
      identificador: ['', Validators.required],
      usuarioCrearDTO: this.fb.group(
        {
          usuario: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          contrasenya: ['', [Validators.required, Validators.minLength(6)]],
          repContrasenya: ['', Validators.required],
        },
        { validators: this.matchPasswords('contrasenya', 'repContrasenya') }
      ),
    });
  }

  matchPasswords(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null; // Si los controles no existen, no hay error
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null; // Si ya hay otros errores, no interferir
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null; // Devuelve null si no hay errores
    };
  }


  onSubmit(): void {
    if (this.autoridadForm.valid) {
      const autoridadData = this.autoridadForm.value;

      // Llama al servicio para enviar los datos al backend
      this.autoridadService.crearAutoridad(autoridadData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.autoridadForm.reset(); // Limpia el formulario tras el envío exitoso
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
        },
      });
    } else {
      this.autoridadForm.markAllAsTouched();
    }
  }


}
