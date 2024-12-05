import {Component, OnInit} from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {HeaderService} from '../../servicios/header.service';

/**
 * Componente que muestra el encabezado de la aplicación.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  logueado: boolean = false;

  constructor(private service: LoginService, private router: Router, private headerService: HeaderService) {
  }
  ngOnInit() {
    this.headerService.datosActualizados$.subscribe(() => {
      this.logueado = this.service.logueado(); // Llama al método para actualizar el encabezado
    });
  }

  /**
   * Método que cierra la sesión del usuario.
   */
  logout(){
    this.service.logOut();
    this.router.navigate(['login']);
  }
  /**
   * Método de login
   */
  log(){
    this.logueado = true;
  }
  recargar(){
    this.ngOnInit();
  }

}

