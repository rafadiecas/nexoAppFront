import {Component, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,

  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AutoridadService} from
    '../../../../servicios/autoridad.service';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSnackBar, MatSnackBarModule} from
    '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';
/**
 * Componente que gestiona la creación de una autoridad desde el
 panel de administración.
 */
@Component({
  selector: 'app-crear-autoridad',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTooltip,
    MatSnackBarModule
  ],
  templateUrl: './crear-autoridad.component.html',
  styleUrls: ['./crear-autoridad.component.css'],
})
export class CrearAutoridadComponent implements OnInit {
  autoridadForm: FormGroup;
  private snackBar = inject(MatSnackBar);
  constructor(private fb: FormBuilder, private autoridadService:
  AutoridadService) {
    this.autoridadForm = this.fb.group({});
  }
  ngOnInit(): void {
    this.autoridadForm = this.fb.group({
      identificador: ['', Validators.required],
      usuarioCrearDTO: this.fb.group(
        {
          usuario: [
            '',
            [Validators.required], // Validador sincrónico requerido
            this.validarIdentificador() // Validador asincrónico
          ],
          email: ['', [Validators.required], this.validarCorreo()],

          contrasenya: ['', [Validators.required,

            Validators.minLength(6)]],

          repContrasenya: ['', Validators.required],
        },
        { validators: this.matchPasswords('contrasenya',
            'repContrasenya') }
      ),
    });
  }

  /**
   * Comprueba que dos campos coincidan, en este caso, contrasenya y
   repContrasenya.
   * @param controlName
   * @param matchingControlName
   */
  matchPasswords(controlName: string, matchingControlName: string)
  {
    return (formGroup: FormGroup): { [key: string]: boolean } |
      null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (!control || !matchingControl) {
        return null; // Si los controles no existen, no hay error
      }
      if (matchingControl.errors &&
        !matchingControl.errors['mustMatch']) {
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
  /**
   * Valida que el identificador de la autoridad sea uno de los
   permitidos.
   */

  validarIdentificador(): AsyncValidatorFn {
    const patronesPermitidos = /^(CNP|GCV|BMB)/;
    return (control: AbstractControl): Observable<ValidationErrors
      | null> => {
      const valor = control.value || '';
      return of(patronesPermitidos.test(valor) ? null : {
        identificadorInvalido: true });
    };
  }
  validarCorreo(): AsyncValidatorFn {
    const emailPermitidos = /^(.*@(cnp\.es|gcv\.es|bomb\.es))$/;
    return (control: AbstractControl): Observable<ValidationErrors
      | null> => {
      const valor = control.value || '';
      return of(emailPermitidos.test(valor) ? null : {
        emailInvalido: true });
    };
  }

  /**
   * Envía los datos del formulario al backend.
   */
  onSubmit(): void {
    if (this.autoridadForm.valid) {
      const autoridadData = this.autoridadForm.value;
      const loadingSnackbar = this.snackBar.open('Creando autoridad...', 'Cerrar');

// Llama al servicio para enviar los datos al backend
      this.autoridadService.crearAutoridad(autoridadData).subscribe({
        next: (response) => {
          loadingSnackbar.dismiss();
          this.snackBar.open('Autoridad creada con éxito', 'Cerrar', {
            duration: 2000,
            });
          console.log('Respuesta del servidor:', response);
          this.autoridadForm.reset();

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
