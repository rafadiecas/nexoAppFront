import {Component, inject, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DesaparicionService } from '../../servicios/desaparicion.service';
import { EditaDesaparicion } from '../../modelos/editaDesaparicion';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { LocalizacionComponent } from '../../features/perfil-usuario/componentes/localizacion/localizacion.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {DesaparicionEditaAutoridad} from '../../modelos/DesaparicionEditaAutoridad';
import {Foto} from '../../modelos/Foto';
import {FileData} from '../../modelos/FileData';
import {InputFotosComponent} from '../../features/perfil-usuario/componentes/input-fotos/input-fotos.component';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InputShareComponent} from '../input-share/input-share.component';

@Component({
  selector: 'app-edita-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LocalizacionComponent,
    TitleCasePipe,
    NgForOf,
    InputFotosComponent,
    MatGridList,
    MatGridTile,
    NgIf,
    InputShareComponent
  ],
  templateUrl: './edita-dialog.component.html',
  styleUrls: ['./edita-dialog.component.css']
})
export class EditaDialogComponent implements OnInit {
  desaparicion: DesaparicionEditaAutoridad = {} as DesaparicionEditaAutoridad;
  desaparicionForm: FormGroup;
  archivos: File[] = [];
  private snackBar = inject(MatSnackBar);
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
      }),
      fotos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.desaparicionService.getEditarDesaparicionAutoridad(this.data.id).subscribe(data => {
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
      // Populate photos FormArray
      if (this.desaparicion.fotos) {
        this.desaparicion.fotos.forEach(foto => this.addFoto(foto));
      }

      console.log(data);
    });
  }
  get fotos(): FormArray {
    const fotosArray = this.desaparicionForm.get('fotos') as FormArray;
    const index = fotosArray.controls.findIndex(foto => foto.get('esCara')?.value);
    if (index > 0) {
      const [fotoConCara] = fotosArray.controls.splice(index, 1);
      fotosArray.controls.unshift(fotoConCara);
    }
    return fotosArray;
  }

  addFoto(foto: Foto = { id: undefined, url: '', esCara: false }): void {
    this.fotos.push(this.fb.group({
      id: [foto.id],
      url: [foto.url],
      esCara: [foto.esCara]
    }));
  }

  removeFoto(index: number): void {
    this.fotos.removeAt(index);
  }
  onFilesChanged(filesData: FileData[]): void {
    this.archivos = filesData.map(fileData => fileData.file as File);
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }

  // guardar(): void {
  //   const desaparicionData = this.desaparicionForm.value;
  //   const formData = new FormData();
  //   formData.append('desaparicion', JSON.stringify(desaparicionData));
  //
  //   this.archivos.forEach(file => {
  //     formData.append('files', file);
  //   });
  //
  //   this.desaparicionService.editarDesaparicionAutoridad(this.data.id, this.desaparicionForm.value).subscribe(
  //     (data) => {
  //       console.log('Desaparición editada correctamente', data);
  //       this.dialogRef.close();
  //     },
  //     (error) => console.error('Error al editar la desaparición', error)
  //   )
  // }
guardar(): void {
    const desaparicionData = this.desaparicionForm.value;
    const formData = new FormData();
    formData.append('id', this.data.id.toString());
    formData.append('desaparicion', JSON.stringify(desaparicionData));
    this.archivos.forEach(file => {
      formData.append('files', file);
    });
    console.log('archivos', this.archivos);
    console.log('FormData a enviar:', formData);
    this.desaparicionService.editarDesaparicionGestion(formData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.snackBar.open('Desaparicion editada con éxito', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Error al editar la desaparición:', error);
        this.snackBar.open('Error al editar la desaparicion', 'Cerrar', {
          duration: 3000
        });
      }
    });

  console.log('Datos de desaparición enviados:', formData);

  }


  openModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          if (result === 'Confirmar') {
            this.desaparicionService.rechazarDesaparicion(this.data.id).subscribe(
              () => {
                this.cerrarDialogo();
                window.location.reload();
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
