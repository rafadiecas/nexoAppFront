import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../servicios/auth.service';
import {AuthServiceService} from '../../core/auth-service.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit{
  rol: string = '';
  constructor(private router: Router, private servicio: AuthServiceService) {
  }
  ngOnInit() {
    this.servicio.obtenerRol().subscribe(data =>{
      this.rol = data;
      if (this.rol == 'ADMIN') {
        this.router.navigate(['/admin/recursos']);
      } else if (this.rol == 'CIVIL') {
        this.router.navigate(['/usuario/civil']);
      }else if (this.rol == 'AUTORIDAD') {
        this.router.navigate(['/usuario/autoridad']);
      }
    });}

}
