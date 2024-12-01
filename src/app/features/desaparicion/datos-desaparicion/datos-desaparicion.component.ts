import {ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {DesaparicionService} from '../../../servicios/desaparicion.service';
import {DesaparicionIndividual} from '../../../modelos/DesaparicionIndividual';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {UsuarioService} from '../../../servicios/usuario.service';
import {CivilService} from '../../../servicios/civil.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Componente que se encarga de mostrar los datos de la desaparición de una persona
 */
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
  @Output() validacionChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  validacion: boolean | undefined = false;
  private snackBar=Inject(MatSnackBar)

  constructor(
    private desaparicionService: DesaparicionService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private civilService: CivilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.desaparicionService.getDesaparicionIndividual(this.id).subscribe(desaparicion => {
      this.desaparicionIndividual = desaparicion;
      this.validacion = this.desaparicionIndividual?.aprobada;
      this.validacionChange.emit(this.validacion);
    });
    this.civilService.listaSeguimiento().subscribe(desapariciones => {
      this.seguimiento = desapariciones.some(desaparicion => desaparicion.id === this.id);
    });
  }

  /**
   * Método que se encarga de añadir una desaparición a seguimiento
   */
  anyadirSeguimiento() {
    this.usuarioService.anyadirSeguimiento(this.id).subscribe(() => {
      this.seguimiento = true;
      this.snackBar.open('Desaparición añadida a seguimiento', 'Cerrar', {
        duration: 3000
      });
    });
  }

  /**
   * Método que se encarga de eliminar una desaparición de seguimiento
   */
  eliminarSeguimiento() {
    this.usuarioService.eliminarSeguimiento(this.id).subscribe(() => {
      this.seguimiento = false;
      this.snackBar.open('Desaparición eliminada de seguimiento', 'Cerrar', {
        duration: 3000
      });
    });
  }
}
