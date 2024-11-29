import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FileData} from '../../modelos/FileData';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-input-share',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatIcon,
    NgForOf,
    NgIf,
    NgClass,
    NgIf,
    MatTooltip
  ],
  templateUrl: './input-share.component.html',
  styleUrls: ['./input-share.component.css']
})
export class InputShareComponent {

  @ViewChild('errorModal') errorModal: any;
  @ViewChild('maxmodal') maxModal: any;

  @Input() imagenCara: boolean = false;

  @Output() filesChanged = new EventEmitter<FileData[]>();
  allFiles: FileData[] = [];
  firstImageSelected = false;


  constructor(private modalService: NgbModal) {}

  onFileSelect(event: any): void {
    const files = event.target.files;

    if (files.length > 0) {
      // Si se selecciona un archivo y es la primera imagen
      if (!this.firstImageSelected && files[0].type.startsWith('image/')) {
        this.firstImageSelected = true; // Se habilita el segundo input
      }

      // Procesamos cada archivo seleccionado
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        // Leemos el archivo como URL de imagen (base64)
        reader.onload = (e: any) => {
          const imageUrl = e.target.result;
          this.allFiles.push({ url: imageUrl });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  onImageClick(i: number) {
    if (i === 0 && this.imagenCara) {
      this.allFiles = [];
      this.firstImageSelected = false;
    } else {
      this.allFiles.splice(i, 1);
    }

    this.emitFiles();
  }


  private emitFiles() {
    this.filesChanged.emit(this.allFiles);
  }
}
