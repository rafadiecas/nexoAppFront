import {Component, OnInit} from '@angular/core';
import {CivilService} from '../../../../servicios/civil.service';
import {DesaparicionLista} from '../../../../modelos/DesaparicionLista';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-lista-seguimiento',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './lista-seguimiento.component.html',
  styleUrl: './lista-seguimiento.component.css'
})
export class ListaSeguimientoComponent implements OnInit{
  constructor(private civilService: CivilService) { }

  desapariciones: DesaparicionLista[] = [];

  ngOnInit() {
    this.civilService.listaSeguimiento().subscribe(desaparicionesListado => this.desapariciones = desaparicionesListado);
    console.log(this.desapariciones);
  }
}
