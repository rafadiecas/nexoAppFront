import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../servicios/login.service';
import {Router, RouterLink} from '@angular/router';
import {HeaderService} from '../../servicios/header.service';

@Component({
  selector: 'app-headernew',
  standalone: true,
  imports: [
    RouterLink
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
  logout(){
    this.service.logOut();
    this.router.navigate(['login']);
  }
  log(){
    this.logueado = true;
  }
  recargar(){
    this.ngOnInit();
  }
}
