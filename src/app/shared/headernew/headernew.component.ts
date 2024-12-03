import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../servicios/login.service';
import {Router, RouterLink} from '@angular/router';
import {HeaderService} from '../../servicios/header.service';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
/**
 * Componente que muestra el encabezado de la aplicación.
 */
@Component({
  selector: 'app-headernew',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatIcon
  ],
  templateUrl: './headernew.component.html',
  styleUrl: './headernew.component.css'
})
export class HeadernewComponent implements OnInit{
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

  // Método para redirigir a la página de avisos
  redirigirAvisos() {
    this.router.navigate(['/home/avisos']);
  }

}
