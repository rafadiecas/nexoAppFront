import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Output() filtroAplicado = new EventEmitter<any>();

  filtro = {
    fecha: '',
    estado: '',
    provincia: '',
    dni: '',
    nombrePersona: '',
    apellidoPersona: '',
    sexo:''
  };

  estados = ['DESAPARECIDO','ENCONTRADO','HERIDO','MUERTO'];
  sexos=['HOMBRE','MUJER','OTRO']

  aplicarFiltro() {
    this.filtroAplicado.emit(this.filtro);
  }

}
