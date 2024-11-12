import {Component, OnInit} from '@angular/core';
import {DesaparicionPrincipalService} from '../../servicios/desaparicion-principal.service';
import {MatGridList, MatGridTile, MatGridTileText} from '@angular/material/grid-list';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-desaparicion-principal',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    MatGridTileText
  ],
  templateUrl: './desaparicion-principal.component.html',
  styleUrl: './desaparicion-principal.component.css'
})
export class DesaparicionPrincipalComponent implements OnInit {
  desapariciones: any[] = [];

  constructor(private desaparicionPrincipalService: DesaparicionPrincipalService) {
  }

  ngOnInit(): void {
    this.desaparicionPrincipalService.getDesaparicionesPrincipal().subscribe((data) =>{
      this.desapariciones = data;
    });
  }

}
