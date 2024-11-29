import {Component, EventEmitter, HostListener, Input, OnInit, output, Output, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import {FileData} from '../../modelos/FileData';

@Component({
  selector: 'app-input-share',
  standalone: true,
  templateUrl: './input-share.component.html',
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatGridList,
    MatGridTile
  ],
  styleUrls: ['./input-share.component.css']
})
export class InputShareComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  @ViewChild('maxmodal') maxModal: any;

  @Output() filesChanged = new EventEmitter<FileData[]>(); // Emitimos los archivos seleccionados

  firstImageSelected = false;
  allFiles: FileData[] = [];

  cols = 3;
  @Input() imagenCara: boolean = false;

  constructor(private modalService: NgbModal) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setColumns();
  }

  setColumns() {
    if (window.innerWidth < 600) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }

  ngOnInit() {
    this.setColumns();
  }

  onFileSelect(event: Event, inputNumber: number): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        this.modalService.open(this.errorModal);
        return;
      }
    }

    const remainingSlots = 4 - this.allFiles.length;
    if (files.length > remainingSlots) {
      this.modalService.open(this.maxModal);
      input.value = '';
      return;
    }

    if (inputNumber === 1 && this.allFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.allFiles[0] = { file: files[0], url: reader.result as string };
        this.emitFiles();
      };
      reader.readAsDataURL(files[0]);
    } else {
      Array.from(files).slice(0, remainingSlots).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.allFiles.push({ file, url: reader.result as string });
          this.emitFiles();
        };
        reader.readAsDataURL(file);
      });
    }

    if (inputNumber === 1) this.firstImageSelected = true;
  }
  onImageClick(i: number) {
    if (i === 0) {
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
