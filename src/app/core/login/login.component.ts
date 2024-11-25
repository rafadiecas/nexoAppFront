import {Component, OnInit, ViewChild} from '@angular/core';
import {Login} from '../../modelos/Login';
import {LoginService} from '../../servicios/login.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router} from "@angular/router";
import {NgIf} from '@angular/common';
import {AuthServiceService} from '../auth-service.service';
import {HeaderComponent} from '../../shared/header/header.component';
import {TokenData} from '../../modelos/TokenData';
import {MatIcon} from '@angular/material/icon';
import {HeaderService} from '../../servicios/header.service';

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
    MatError,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[LoginService]
})
export class LoginComponent implements OnInit{
  login:Login =  new Login();
  usuarioForm!: FormGroup;
  fallo: boolean = false;
  noVerificado: boolean = false;
  usuarioNoExiste: boolean = false;
  constructor(private headerService: HeaderService, private fb: FormBuilder, private service: LoginService, private router: Router, private servicioAuth: AuthServiceService){
    // localStorage.clear();

  }
  ngOnInit(): void {
    this.usuarioForm = this.fb.group(
      {
        usuario: ['', Validators.required],
        contrasenya: ['', Validators.required],
      })
  }
  iniciarSesion() {
    this.fallo = false;
    this.usuarioNoExiste = false;
    this.noVerificado = false;
    this.login = this.usuarioForm.value;
    this.service.login(this.login).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if(respuesta.token == null){
          if (respuesta.verificado == null){
            this.usuarioNoExiste = true;
          }else {
            this.fallo=true;
          }
        }else {
          if (respuesta.verificado){
            localStorage.setItem('token' , respuesta.token);
            localStorage.setItem('username', this.usuarioForm.get('usuario')?.value);
            console.log(respuesta);
            this.headerService.notificarActualizacion();
            this.router.navigate(['']);
          }else if (!respuesta.verificado){
            this.noVerificado = true;

          }
        }
      },
      error: (e) => console.error(e),

    });
  }
}
