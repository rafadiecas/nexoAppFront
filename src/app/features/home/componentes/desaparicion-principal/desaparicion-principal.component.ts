import {Component, OnInit} from '@angular/core';
import {DesaparicionService} from '../../../../servicios/desaparicion.service';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {DatePipe, NgForOf, UpperCasePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-desaparicion-principal',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './desaparicion-principal.component.html',
  styleUrl: './desaparicion-principal.component.css'
})
export class DesaparicionPrincipalComponent implements OnInit {
  desapariciones: any[] = [];

  constructor(private desaparicionPrincipalService: DesaparicionService) {
  }

  ngOnInit(): void {
    this.desaparicionPrincipalService.getDesaparicionesPrincipal().subscribe((data) =>{
      this.desapariciones = data;
    });
  }

}
