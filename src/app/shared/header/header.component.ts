import {Component, OnInit} from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  logueado: boolean = false;

  constructor(private service: LoginService, private router: Router) {
  }
  ngOnInit() {
    this.logueado = this.service.logueado();
  }
  logout(){
    this.service.logOut();
    this.router.navigate(['login']);
  }
  log(){
    this.logueado = true;
  }
}

