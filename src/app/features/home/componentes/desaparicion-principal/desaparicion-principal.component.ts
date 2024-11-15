import {Component, OnInit} from '@angular/core';
import {DesaparicionService} from '../../../../servicios/desaparicion.service';
import {MatGridList, MatGridTile, MatGridTileText} from '@angular/material/grid-list';
import {NgForOf} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-desaparicion-principal',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    MatGridTileText,
    MatCardContent,
    MatCard
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
      console.log(data);
      console.log(this.desapariciones)
    });
  }

}
