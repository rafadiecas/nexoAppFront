import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DesaparicionService} from '../../../servicios/desaparicion.service';
import {DesaparicionIndividual} from '../../../modelos/DesaparicionIndividual';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {UsuarioService} from '../../../servicios/usuario.service';
import {CivilService} from '../../../servicios/civil.service';

@Component({
  selector: 'app-datos-desaparicion',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './datos-desaparicion.component.html',
  styleUrl: './datos-desaparicion.component.css'
})
export class DatosDesaparicionComponent implements OnInit {

  id!: number;
  desaparicionIndividual?: DesaparicionIndividual;
  seguimiento: boolean = false;

  constructor(
    private desaparicionService: DesaparicionService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private civilService: CivilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.desaparicionService.getDesaparicionIndividual(this.id).subscribe(desaparicion => this.desaparicionIndividual = desaparicion);
    this.civilService.listaSeguimiento(3).subscribe(desapariciones => {
      this.seguimiento = desapariciones.some(desaparicion => desaparicion.id === this.id);
    });
  }

  anyadirSeguimiento() {
    this.usuarioService.anyadirSeguimiento(3, this.id).subscribe(() => {
      this.seguimiento = true;
    });
  }

  eliminarSeguimiento() {
    this.usuarioService.eliminarSeguimiento(3, this.id).subscribe(() => {
      this.seguimiento = false;
    });
  }
}
