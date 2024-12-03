import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DesaparicionFormComponent} from '../../shared/crear-desaparicion/crear-desaparicion.component';

/**
 *
 * Componente que contiene las opciones de administración de la aplicación.
 */
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    DesaparicionFormComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(private router: Router) {}

  /**
   * Navega a la ruta especificada.
   * @param route
   */
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
