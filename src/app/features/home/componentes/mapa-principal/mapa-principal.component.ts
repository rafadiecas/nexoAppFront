import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../../../servicios/lugar.service';
import { MapaPrincipal } from '../../../../modelos/MapaPrincipal';
import * as L from 'leaflet';
import {Router} from '@angular/router';

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
  selector: 'app-mapa-principal',
  standalone: true,
  imports: [],
  templateUrl: './mapa-principal.component.html',
  styleUrls: ['./mapa-principal.component.css']
})
export class MapaPrincipalComponent implements OnInit {
  private lugares: MapaPrincipal[] = [];
  private map!: L.Map;

  constructor(private lugarService: LugarService, private  router:Router) { }

  ngOnInit() {
    (window as any)['navigateToLugar'] = (id: string) => this.navigateToLugar(id);
    this.initMap();
    this.lugarService.getLugaresPrincipal().subscribe(data => {
      this.lugares = data;
      this.addMarkers();
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.4168, -3.7038], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.lugares.forEach(lugar => {
      if (lugar.lat !== undefined && lugar.lon !== undefined) {
        const marker = L.marker([lugar.lat, lugar.lon]).addTo(this.map);

        const popupContent = `
        <strong>${lugar.nombre}</strong><br>
        ${lugar.descripcion}<br>
        <button onclick="window.navigateToLugar('${lugar.id}')" style="background:none; color:blue; border:none; cursor:pointer; text-decoration:underline;">
          Ver más detalles
        </button>
      `;

        marker.bindPopup(popupContent);
      }
    });
  }


  navigateToLugar(id: string): void {
    this.router.navigate(['/desaparicion', id]);
  }


}
