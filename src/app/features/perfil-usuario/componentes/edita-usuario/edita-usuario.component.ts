import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CivilService} from '../../../../servicios/civil.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Componente que permite editar los datos del usuario civil
 */
@Component({
  selector: 'app-edita-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edita-usuario.component.html',
  styleUrl: './edita-usuario.component.css'
})
export class EditaUsuarioComponent implements OnInit{
  civilForm: FormGroup;
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private civilService:CivilService) {
    this.civilForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['',Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
    });
  }

  ngOnInit(): void {
    this.civilService.getCivil().subscribe(civil => {
      this.civilForm.patchValue(civil);
      this.civilForm.get('dni')?.disable();
    });
  }

  /**
   * Método que envía los datos del formulario para actualizar el usuario civil
   */
  submit(): void {
    if (this.civilForm.valid) {

      this.civilForm.get('dni')?.enable();

      this.civilService.actualizarCivil(this.civilForm.value).subscribe({
        next: (response) => {
          console.log(response.mensaje);

          this.civilService.getCivil().subscribe(civil => {
            this.civilForm.patchValue(civil);

            this.civilForm.get('dni')?.disable();

            this.snackBar.open('Usuario editado con éxito', 'Cerrar', {
              duration: 3000
            });
          });
        },
        error: (error) => {
          console.error('Error al actualizar el civil:', error);

          this.civilForm.get('dni')?.disable();
        },
      });
    }
  }

}
