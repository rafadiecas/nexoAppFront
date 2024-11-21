import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  DesaparicionPrincipalComponent
} from './features/home/componentes/desaparicion-principal/desaparicion-principal.component';
import {HeaderComponent} from './shared/header/header.component';
import {LoginComponent} from './core/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DesaparicionPrincipalComponent, HeaderComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nexoApp';
}
