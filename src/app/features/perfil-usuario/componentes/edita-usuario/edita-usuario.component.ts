import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CivilService} from '../../../../servicios/civil.service';

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

  submit(): void {
    if (this.civilForm.valid) {

      this.civilForm.get('dni')?.enable();

      this.civilService.actualizarCivil(this.civilForm.value).subscribe({
        next: (response) => {
          console.log(response.mensaje);

          this.civilService.getCivil().subscribe(civil => {
            this.civilForm.patchValue(civil);

            this.civilForm.get('dni')?.disable();
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
