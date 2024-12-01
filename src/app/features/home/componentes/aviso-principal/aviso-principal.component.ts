import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../../../servicios/aviso.service';
import { Aviso } from '../../../../modelos/Aviso';
import { CrearAvisoComponent } from '../crear-aviso/crear-aviso.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente que muestra los avisos en la página principal
 */
@Component({
  selector: 'app-aviso-principal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CrearAvisoComponent],
  templateUrl: './aviso-principal.component.html',
  styleUrls: ['./aviso-principal.component.css']
})
export class AvisoPrincipalComponent implements OnInit {
  avisos: Aviso[] = [];
  loading = true;
  errorMessage = '';

  constructor(private avisoService: AvisoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.avisoService.getAvisos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.avisos = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al cargar los avisos.';
        this.loading = false;
      }
    });
  }

  /**
   * Abre el modal para crear un aviso
   */
  abrirModal() {
    const dialogRef = this.dialog.open(CrearAvisoComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.enviarAviso(result); // Llamar al método que envía el aviso creado
      }
    });
  }

  /**
   * Envía un aviso al backend
   * @param aviso
   */
  enviarAviso(aviso: any) {
    // Aquí, aseguramos que el objeto aviso sea convertido a FormData
    const formData = new FormData();
    formData.append('aviso', JSON.stringify(aviso));  // Convertir el objeto aviso a JSON string
    aviso.files.forEach((file: File) => {
      formData.append('files', file);  // Asegurarse de agregar los archivos también
    });

    // Llamar al servicio con FormData
    this.avisoService.crearAviso(formData).subscribe({
      next: (response) => {
        console.log('Aviso creado:', response);
      },
      error: (error) => {
        console.error('Error al crear aviso:', error);
      }
    });
  }
}
