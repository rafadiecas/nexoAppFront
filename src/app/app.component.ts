import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  DesaparicionPrincipalComponent
} from './features/home/componentes/desaparicion-principal/desaparicion-principal.component';
import {HeaderComponent} from './shared/header/header.component';
import {LoginComponent} from './core/login/login.component';
import {FooterComponent} from './features/home/componentes/footer/footer.component';
import {HeadernewComponent} from './shared/headernew/headernew.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DesaparicionPrincipalComponent, HeaderComponent, LoginComponent, FooterComponent,HeadernewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nexoApp';
}
