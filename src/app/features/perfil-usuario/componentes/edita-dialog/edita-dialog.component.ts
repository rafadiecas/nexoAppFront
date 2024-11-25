import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DesaparicionService } from '../../../../servicios/desaparicion.service';
import { EditaDesaparicion } from '../../../../modelos/editaDesaparicion';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalizacionComponent } from '../localizacion/localizacion.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-edita-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LocalizacionComponent,
    TitleCasePipe
  ],
  templateUrl: './edita-dialog.component.html',
  styleUrls: ['./edita-dialog.component.css']
})
export class EditaDialogComponent implements OnInit {
  desaparicion: EditaDesaparicion = {} as EditaDesaparicion;
  desaparicionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private desaparicionService: DesaparicionService,
    private fb: FormBuilder,
    private modalService:NgbModal
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

  guardar(): void {
    this.desaparicionService.editarDesaparicionAutoridad(this.data.id, this.desaparicionForm.value).subscribe(
      (data) => {
        console.log('Desaparición editada correctamente', data);
        this.dialogRef.close();
      },
      (error) => console.error('Error al editar la desaparición', error)
    )
  }

  openModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          if (result === 'Confirmar') {
            this.desaparicionService.rechazarDesaparicion(this.data.id).subscribe(
              () => {
                this.cerrarDialogo();
              },
              (error) => console.error('Error al denegar desaparición', error)
            );
          }
        },
        (reason) => {
          console.log('Modal cerrado:', reason);
        }
      );
  }
}
