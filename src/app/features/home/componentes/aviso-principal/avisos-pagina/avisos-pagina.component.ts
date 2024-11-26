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
        this.avisos = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al cargar los avisos.';
        this.loading = false;
      }
    });
  }
}
