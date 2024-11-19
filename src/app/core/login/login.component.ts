import {Component, OnInit} from '@angular/core';
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
  constructor(private fb: FormBuilder, private service: LoginService, private router: Router, private servicioAuth: AuthServiceService){
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
    this.login = this.usuarioForm.value;
    this.service.login(this.login).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if(respuesta.token != null){
          localStorage.setItem('token' , respuesta.token);
          localStorage.setItem('username', this.usuarioForm.get('usuario')?.value);
          console.log(respuesta);
          console.log(localStorage.getItem('token'));


          this.router.navigate(['']);
        } else {
          this.fallo = true;
        }

      },
      error: (e) => console.error(e),

    });
  }
}
