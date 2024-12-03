import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../servicios/login.service';
import {Router, RouterLink} from '@angular/router';
import {HeaderService} from '../../servicios/header.service';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Notificacion} from '../../modelos/Notificacion';
import {NotificacionService} from '../../servicios/notificacion.service';

@Component({
  selector: 'app-headernew',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    CommonModule
  ],
  templateUrl: './headernew.component.html',
  styleUrl: './headernew.component.css'
})
export class HeadernewComponent implements OnInit{
  logueado: boolean = false;
  cargando: boolean = false;
  dropdownVisible: boolean = false;
  notificaciones: Notificacion[] = [];

  constructor(private service: LoginService, private router: Router, private headerService: HeaderService,private http: HttpClient,private notificacionesService: NotificacionService) {
  }
  ngOnInit() {
    this.headerService.datosActualizados$.subscribe(() => {
      this.logueado = this.service.logueado(); // Llama al método para actualizar el encabezado
    });

    this.cargarNotificaciones();
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

  // Método para redirigir a la página de avisos
  redirigirAvisos() {
    this.router.navigate(['/home/avisos']);
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownVisible = !this.dropdownVisible;

    if (this.dropdownVisible && this.notificaciones.length === 0) {
      this.cargarNotificaciones();
    }
  }

  cargarNotificaciones(): void {
    this.cargando = true;
    this.notificacionesService.obtenerNotificaciones()
      .subscribe({
        next: (data) => {
          this.notificaciones = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar notificaciones', err);
          this.cargando = false;
        }
      });

  }

  formatFecha(fecha: string): string {
    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  }

}
