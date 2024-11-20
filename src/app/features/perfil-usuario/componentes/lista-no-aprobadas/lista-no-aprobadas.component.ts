import {Component, OnInit} from '@angular/core';
import {DesaparicionService} from '../../../../servicios/desaparicion.service';
import {DesaparicionIndividual} from '../../../../modelos/DesaparicionIndividual';
import {NgForOf} from '@angular/common';
import {LugarService} from '../../../../servicios/lugar.service';
import {DesaparicionSinVerificar} from '../../../../modelos/DesaparicionSinVerificar';

@Component({
  selector: 'app-lista-no-aprobadas',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './lista-no-aprobadas.component.html',
  styleUrl: './lista-no-aprobadas.component.css'
})
export class ListaNoAprobadasComponent implements OnInit {

  constructor(private desaparicionService: DesaparicionService,private lugarService:LugarService) { }
  noAprobadas: DesaparicionSinVerificar[] = [];

  ngOnInit(): void {
    this.desaparicionService.getNoAprobadas().subscribe((data: DesaparicionSinVerificar[]) => {
      this.noAprobadas = data;
      console.log(data)
    });

  }

}
