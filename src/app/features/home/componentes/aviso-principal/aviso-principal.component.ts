import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../../../servicios/aviso.service';  // Asegúrate de importar el servicio correcto
import { Aviso } from '../../../../modelos/Aviso';  // Asegúrate de tener el modelo adecuado
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aviso-principal',
  templateUrl: './aviso-principal.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./aviso-principal.component.css']
})
export class AvisoPrincipalComponent implements OnInit {
  avisos: Aviso[] = [];
  loading = true;
  errorMessage = '';

  constructor(private avisoService: AvisoService) {}

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
}
