import { Component } from '@angular/core';
import {MapaComponent} from './mapa/mapa.component';
import {DatosDesaparicionComponent} from "./datos-desaparicion/datos-desaparicion.component";
import {ComentariosComponent} from './comentarios/comentarios.component';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {DesaparicionService} from '../../servicios/desaparicion.service';

@Component({
  selector: 'app-desaparicion',
  standalone: true,
  imports: [
    MapaComponent,
    DatosDesaparicionComponent,
    ComentariosComponent,
    NgIf
  ],
  templateUrl: './desaparicion.component.html',
  styleUrl: './desaparicion.component.css'
})
export class DesaparicionComponent {
  validacion: boolean | undefined;
  desapariciones: any[] = [];
  sexos: string[] = ['Masculino', 'Femenino', 'Otro'];
  estados: string[] = ['DESAPARECIDO','ENCONTRADO','HERIDO','MUERTO'];
  onValidacionChange(validacion: boolean) {
    this.validacion = validacion;
  }
  filtro: { [key: string]: string } = {
    fecha: '',
    estado: '',
    nombreLugar: '',
    dni: '',
    nombrePersona: '',
    apellidoPersona: '',
    sexo: ''
  };

  constructor(private desaparicionService: DesaparicionService) {}

  buscarDesapariciones() {
    this.desaparicionService.buscarDesapariciones(this.filtro).subscribe((data) => {
      this.desapariciones = data;
    });
  }

}
