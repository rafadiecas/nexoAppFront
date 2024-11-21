import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DesaparicionFormComponent} from '../perfil-usuario/componentes/crear-desaparicion/crear-desaparicion.component';

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

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
