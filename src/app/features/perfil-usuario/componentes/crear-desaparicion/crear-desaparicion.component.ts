import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crear-desaparicion',
  templateUrl: './crear-desaparicion.component.html',
  standalone: true
})
export class DesaparicionIndividualFormComponent {
  desaparicionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.desaparicionForm = this.fb.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      id_usuario: ['', Validators.required],
      persona: this.fb.group({
        dni: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        sexo: ['', Validators.required],
        altura: [null, Validators.required],
        complexion: ['', Validators.required],
        descripcion: [''],
      }),
      lugar: this.fb.group({
        provincia: ['', Validators.required],
        localidad: ['', Validators.required],
        calle: ['', Validators.required]
      }),
    });
  }


  onSubmit(): void {
    if (this.desaparicionForm.valid) {
      const desaparicionData = this.desaparicionForm.value;
      console.log('Datos de desaparición enviados:', desaparicionData);
      // Aquí puedes enviar los datos al backend usando un servicio HTTP
    } else {
      console.log('Formulario no válido');
    }
  }
}
