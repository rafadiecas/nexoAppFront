import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {AvisoService} from '../../../../../servicios/aviso.service';
import {Aviso} from '../../../../../modelos/Aviso'; // Si usas Angular Material

@Component({
  selector: 'app-aviso-pagina',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './avisos-pagina.component.html',
  styleUrls: ['./avisos-pagina.component.css']
})
export class AvisoPaginaComponent implements OnInit {
  avisos: Aviso[] = [];
  loading = true;
  errorMessage = '';

  constructor(private avisoService: AvisoService) {}

  ngOnInit() {
    this.avisoService.getAvisos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.avisos = data.map((aviso) => ({
          ...aviso,
          fecha: this.formatFecha(aviso.fecha), // Aplica formato de fecha y hora
        }));
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al cargar los avisos.';
        this.loading = false;
      },
    });
  }
  formatFecha(fecha: string | undefined): string {
    if (!fecha) {
      return 'Fecha no disponible';
    }

    // Reemplazar espacio con 'T' y cortar la fracción de segundos si no es necesaria
    const formattedFecha = fecha.replace(' ', 'T').slice(0, 19); // '2024-11-28T16:28:49'
    const date = new Date(formattedFecha);

    // Opciones para mostrar la fecha
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' } as const;

    // Opciones para mostrar la hora
    const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false } as const;

    return `${date.toLocaleDateString('es-ES', opcionesFecha)} ${date.toLocaleTimeString('es-ES', opcionesHora)}`;
  }
}
