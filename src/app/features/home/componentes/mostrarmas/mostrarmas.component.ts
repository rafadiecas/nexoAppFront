import { Component } from '@angular/core';
import {DesaparicionService} from '../../../../servicios/desaparicion.service';
import {DesaparicionComponent} from '../../../desaparicion/desaparicion.component';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-mostrarmas',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './mostrarmas.component.html',
  styleUrl: './mostrarmas.component.css'
})
export class MostrarmasComponent {
  sexos: string[] = ['Masculino', 'Femenino', 'Otro'];
  estados: string[] = ['DESAPARECIDO','ENCONTRADO','HERIDO','MUERTO'];
  desapariciones: DesaparicionComponent[] = [];
  filtro = {
    fecha: '',
    estado: '',
    nombreLugar: '',
    dni: '',
    nombrePersona: '',
    apellidoPersona: '',
    sexo: ''
  };

  constructor(private desaparicionService: DesaparicionService) {}

  ngOnInit(): void {
    this.obtenerDesapariciones();
  }

  obtenerDesapariciones(): void {
    this.desaparicionService.buscarDesapariciones(this.filtro).subscribe((data) => {
      this.desapariciones = data;
    });
  }

  buscarDesapariciones(): void {
    this.obtenerDesapariciones();
  }
}
