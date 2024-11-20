import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CivilService } from '../../servicios/civil.service';
import {CommonModule} from '@angular/common';
import {CrearUsuario} from '../../modelos/CrearUsuario';
import {CivilCrearDTO} from '../../modelos/CrearCivil';
import {AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';

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
  usuario!: CrearUsuario;
  civil!: CivilCrearDTO;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        dni: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        usuario: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contrasenya: ['', [Validators.required, this.passwordStrength()]], // Validador de complejidad
        repContrasenya: ['', Validators.required]
      },
      {
        validators: this.matchPasswords('contrasenya', 'repContrasenya') // Validador de coincidencia
      }
    );
    console.log(this.usuarioForm.get('nombre'));
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
    if (this.usuarioForm.valid) {
      // Mapear los datos del formulario a `CivilCrearDTO`
      this.usuario = {
        usuario: this.usuarioForm.get('usuario')?.value,
        email: this.usuarioForm.get('email')?.value,
        contrasenya: this.usuarioForm.get('contrasenya')?.value,
        repContrasenya: this.usuarioForm.get('repContrasenya')?.value,
      }
      this.civil = {
        nombre: this.usuarioForm.get('nombre')?.value,
        apellido: this.usuarioForm.get('apellidos')?.value,
        dni: this.usuarioForm.get('dni')?.value,
        telefono: this.usuarioForm.get('telefono')?.value,
        usuarioCrearDTO: this.usuario,
      };
      this.authService.registraCivil(this.civil).subscribe({
        next: (respuesta) => {
          console.log('Registro exitoso:', respuesta);
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Error durante el registro:', error);
        },
      });
    }
  }

}
