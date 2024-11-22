import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DesaparicionService } from '../../../../servicios/desaparicion.service';
import { EditaDesaparicion } from '../../../../modelos/editaDesaparicion';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalizacionComponent } from '../localizacion/localizacion.component';

@Component({
  selector: 'app-edita-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LocalizacionComponent
  ],
  templateUrl: './edita-dialog.component.html',
  styleUrls: ['./edita-dialog.component.css']
})
export class EditaDialogComponent implements OnInit {
  desaparicion: EditaDesaparicion = {} as EditaDesaparicion;
  desaparicionForm: FormGroup;
  initialLocationData: any;

  constructor(
    public dialogRef: MatDialogRef<EditaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private desaparicionService: DesaparicionService,
    private fb: FormBuilder
  ) {
    this.desaparicionForm = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      lugarLatLongDTO: this.fb.group({
        provincia: [''],
        localidad: [''],
        calle: [''],
        latitud: [''],
        longitud: ['']
      })
    });
  }

  ngOnInit(): void {
    this.desaparicionService.getEditarDesaparicion(this.data.id).subscribe(data => {
      this.desaparicion = data;
      const lugar = this.desaparicion.lugarLatLongDTO || {};
      this.desaparicionForm.patchValue({
        descripcion: this.desaparicion.descripcion,
        estado: this.desaparicion.estado,
        lugarLatLongDTO: {
          provincia: lugar.provincia || '',
          localidad: lugar.localidad || '',
          calle: lugar.calle || ''
        }
      });
      console.log(data);
    });
  }



  cerrarDialogo(): void {
    this.dialogRef.close();
  }

  // Método para guardar los datos
  guardar(): void {
    this.desaparicionService.editarDesaparicionAutoridad(this.data.id, this.desaparicionForm.value).subscribe(
      (data) => {
        console.log('Desaparición editada correctamente', data);
        this.dialogRef.close();
      },
      (error) => console.error('Error al editar la desaparición', error)
    )
  }
}
