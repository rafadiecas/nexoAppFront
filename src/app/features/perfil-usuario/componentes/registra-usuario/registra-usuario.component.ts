import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CivilService } from '../../../../servicios/civil.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-registra-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registra-usuario.component.html',
  styleUrls: ['./registra-usuario.component.css']
})
export class RegistraUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;

  constructor(private fb: FormBuilder, private civilService: CivilService) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group(
      {
        usuario: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contrasenya: ['', [Validators.required, this.passwordStrength()]], // Validador de complejidad
        repContrasenya: ['', Validators.required]
      },
      {
        validators: this.matchPasswords('contrasenya', 'repContrasenya') // Validador de coincidencia
      }
    );
  }

  // Validador para la complejidad de la contraseña
  private passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasMinLength = value.length >= 6;

      const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && hasMinLength;

      return !isValid ? { passwordStrength: true } : null;
    };
  }

  // Validador para comparar contraseñas
  private matchPasswords(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }

  submit(): void {
    console.log('Formulario válido:', this.usuarioForm.valid);
    console.log('Errores:', this.usuarioForm.errors);
    console.log('Valores:', this.usuarioForm.value);
  }

}
