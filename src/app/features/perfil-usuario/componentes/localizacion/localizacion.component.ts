import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalizacionService } from '../../../../servicios/localizacion.service';
import {NgForOf, NgIf, SlicePipe} from '@angular/common';

/**
 * Componente que permite seleccionar una localización para usar en la creación de una desaparición
 */
@Component({
  selector: 'app-localizacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    SlicePipe
  ],
  templateUrl: './localizacion.component.html',
  styleUrls: ['./localizacion.component.css']
})
export class LocalizacionComponent implements OnInit {
  @Output() addressChanged = new EventEmitter<any>();

  locationForm: FormGroup;
  locations: any[] = [];
  provinces: any[] = [];
  towns: any[] = [];
  filteredTowns: any[] = [];

  constructor(private localizacionService: LocalizacionService) {
    this.locationForm = new FormGroup({
      provincia: new FormControl(''),
      localidad: new FormControl(''),
      calle: new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.localizacionService.getLocations().subscribe((data) => {
      this.locations = data;
      this.provinces = this.locations.flatMap((comunidad) => comunidad.provinces);
    });


    this.locationForm.valueChanges.subscribe((value) => {
      this.addressChanged.emit(value);
    });
  }

  /**
   * Método que se ejecuta al seleccionar una provincia, para obtener los municipios de la provincia seleccionada
   * @param event
   */
  onProvinceChange(event: Event): void {
    const provinceCode = (event.target as HTMLSelectElement).value;
    const selectedProvince = this.provinces.find((province) => province.code === provinceCode);
    this.towns = selectedProvince ? selectedProvince.towns : [];
    this.filteredTowns = [...this.towns];
  }

  /**
   * Método que se ejecuta al escribir en el input de municipios, para filtrar los municipios
   * @param event
   */
  filterTowns(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const filterValue = value.toLowerCase();
    this.filteredTowns = this.towns.filter((town) =>
      town.label.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Método que se ejecuta al seleccionar un municipio, para rellenar el input de municipio y ocultar la lista de municipios
   * @param town
   */
  selectTown(town: any): void {
    if (this.locationForm) {
      this.locationForm.get('localidad')?.setValue(town.label);
      this.filteredTowns = [];
    }
  }
}
