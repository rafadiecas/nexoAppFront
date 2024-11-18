import {Component, OnInit} from '@angular/core';
import {Login} from '../../modelos/Login';
import {LoginService} from '../../servicios/login.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router} from "@angular/router";
import {NgIf} from '@angular/common';
import {AuthService} from '../../core/auth-service.service';
import {HeaderComponent} from '../../shared/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatCardActions,
    NgIf,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[LoginService]
})
export class LoginComponent implements OnInit{
  usuario: string = '';
  contrasenya: string = '';
  login:Login =  new Login();
  constructor(private service: LoginService, private router: Router, private servicioAuth: AuthService) {
    // localStorage.clear();
  }
  iniciarSesion() {
    this.login.usuario = this.usuario;
    this.login.contrasenya = this.contrasenya;
    this.service.login(this.login).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if(respuesta.token != null){
          localStorage.setItem('token' , respuesta.token);
          localStorage.setItem('token' , respuesta.id);
          localStorage.setItem('username', this.usuario);
          console.log(respuesta);
          console.log(localStorage.getItem('token'));


          this.router.navigate(['']);
        }

      },
      error: (e) => console.error(e),

    });
  }

  ngOnInit(): void {
    this.usuario='';
    this.contrasenya='';
  }

}
