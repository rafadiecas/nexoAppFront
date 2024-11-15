import {Component, OnInit} from '@angular/core';
import {CivilService} from '../../../../servicios/civil.service';
import {DesaparicionLista} from '../../../../modelos/DesaparicionLista';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-lista-desapariciones',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './lista-desapariciones.component.html',
  styleUrl: './lista-desapariciones.component.css'
})
export class ListaDesaparicionesComponent implements OnInit {

  constructor(private civilService: CivilService) { }

  desapariciones: DesaparicionLista[] = [];

  ngOnInit() {
    this.civilService.listaDesapariciones(3).subscribe(desaparicionesListado => this.desapariciones = desaparicionesListado);
    console.log(this.desapariciones);
  }

}
