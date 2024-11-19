import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../../../servicios/aviso.service';  // Asegúrate de importar el servicio correcto
import { Aviso } from '../../../../modelos/Aviso';  // Asegúrate de tener el modelo adecuado
import {CrearAvisoComponent} from '../crear-aviso/crear-aviso.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-aviso-principal',
  templateUrl: './aviso-principal.component.html',
  imports: [CommonModule,MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    CrearAvisoComponent,MatDialogModule],
  standalone: true,
  styleUrls: ['./aviso-principal.component.css']
})
export class AvisoPrincipalComponent implements OnInit {
  avisos: Aviso[] = [];
  loading = true;
  errorMessage = '';
  archivos: File[] = [];

  constructor(private avisoService: AvisoService,private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.avisoService.getAvisos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);  // Agrega esta línea para verificar la respuesta
        this.avisos = data.map(aviso => ({
          ...aviso,
          fotos: aviso.fotos ?? []  // Asegúrate de que 'fotos' sea un array vacío si es null o undefined
        }));

        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al cargar los avisos.';
        this.loading = false;
      }
    });
  }

  abrirModal() {
    const dialogRef = this.dialog.open(CrearAvisoComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.enviarAviso(result);
      }
    });
  }


  enviarAviso(aviso: any) {
    const apiUrl = '/api/aviso/crearAviso';  // Asegúrate de que la URL sea correcta

    // Primero, convertir el objeto de aviso a un string JSON
    const avisoJson = JSON.stringify(aviso);
    console.log('Aviso JSON:', avisoJson);  // Agregar log para verificar los datos

    // Crear un objeto FormData para enviar el JSON y los archivos
    const formData = new FormData();

    // Agregar el aviso como un parámetro de tipo String
    formData.append('aviso', avisoJson);

    // Si tienes archivos, agrégarlos aquí
    this.archivos.forEach(file => {
      formData.append('files', file);
    });

    // Enviar la solicitud POST con FormData
    this.http.post(apiUrl, formData).subscribe({
      next: (response) => console.log('Aviso creado:', response),
      error: (error) => console.error('Error al crear aviso:', error),
    });
  }
}
