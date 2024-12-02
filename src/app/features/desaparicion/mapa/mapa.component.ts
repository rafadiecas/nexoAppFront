import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {LugarService} from '../../../servicios/lugar.service';
import {MapaDesaparicion} from '../../../modelos/MapaDesaparicion';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {

  private lugar?: MapaDesaparicion;
  private map!: L.Map;

  constructor(private lugarService: LugarService, private ruta: ActivatedRoute) { }

  ngAfterViewInit() {
    // Escuchar la apertura del modal
    const modalElement = document.getElementById('mapModal');
    modalElement?.addEventListener('shown.bs.modal', () => {
      this.initMap(); // Inicializar el mapa al abrir el modal
      const id = Number(this.ruta.snapshot.paramMap.get('id'));
      this.lugarService.getLugarDesaparicion(id).subscribe(data => {
        this.lugar = data;
        console.log(this.lugar);
        if (this.lugar.latitud !== undefined && this.lugar.longitud !== undefined) {
          this.map.setView([this.lugar.latitud, this.lugar.longitud], 19);
          this.addMarkers();
        }
      });
    });
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove(); // Remover mapa previo si ya existe
    }
    this.map = L.map('map').setView([0, 0], 10); // Inicializar mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
  }

  private addMarkers(): void {
    if (this.lugar?.latitud !== undefined && this.lugar?.longitud !== undefined) {
      const marker = L.marker([this.lugar.latitud, this.lugar.longitud]).addTo(this.map);
      marker.bindPopup(`${this.lugar.provincia}<br>${this.lugar.localidad}<br>${this.lugar.calle}`);
    }
  }
}
