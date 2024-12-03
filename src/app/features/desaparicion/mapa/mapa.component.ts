import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {LugarService} from '../../../servicios/lugar.service';
import {MapaDesaparicion} from '../../../modelos/MapaDesaparicion';
import {ActivatedRoute} from '@angular/router';

/**
 * Componente que se encarga de mostrar un mapa con la ubicación de la desaparición
 */
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';
const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {

  private lugar?: MapaDesaparicion;
  private map!: L.Map;

  constructor(private lugarService: LugarService, private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.initMap();
    const id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.lugarService.getLugarDesaparicion(id).subscribe(data => {
      this.lugar = data;
      console.log(this.lugar);
      if (this.lugar.latitud !== undefined && this.lugar.longitud !== undefined) {
        this.map.setView([this.lugar.latitud, this.lugar.longitud], 19);
      this.addMarkers();
      }
    });
  }

  /**
   * Método que se encarga de inicializar el mapa
   * @private
   */
  private initMap(): void {
      this.map = L.map('map').setView([0, 0], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
    }

  /**
   * Método que se encarga de añadir los marcadores al mapa
   * @private
   */
  private addMarkers(): void {
      if (this.lugar?.latitud !== undefined && this.lugar?.longitud !== undefined) {
        const marker = L.marker([this.lugar.latitud, this.lugar.longitud]).addTo(this.map);

        marker.bindPopup(`${this.lugar.provincia}<br>${this.lugar.localidad}<br>${this.lugar.calle}`);
      }
  }

}
