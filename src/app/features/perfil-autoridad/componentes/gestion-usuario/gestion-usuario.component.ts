import {Component, OnInit} from '@angular/core';
import {CivilConfirmar} from '../../../../modelos/CivilConfirmar';
import {CivilService} from '../../../../servicios/civil.service';

@Component({
  selector: 'app-gestion-usuario',
  standalone: true,
  imports: [],
  templateUrl: './gestion-usuario.component.html',
  styleUrl: './gestion-usuario.component.css'
})
export class GestionUsuarioComponent implements OnInit{
  civilSinVer: CivilConfirmar[] = [];
  constructor(private servicio: CivilService) {
  }
  ngOnInit(){
    this.servicio.listaCivilSinVer().subscribe({
      next: (data) => {
        this.civilSinVer = data; // Manejo de datos recibidos
        console.log(data)
      },
      error: (err) => {
        console.error('Error al cargar la lista:', err); // Manejo de errores
      },
      complete: () => {
        console.log('La solicitud ha finalizado con éxito.'); // Acción al completarse
      }
    });
  }
}
