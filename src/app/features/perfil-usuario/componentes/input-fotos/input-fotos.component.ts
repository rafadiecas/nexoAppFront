import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileData } from '../../../../modelos/FileData';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-input-fotos',
  standalone: true,
  templateUrl: './input-fotos.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./input-fotos.component.css']
})
export class InputFotosComponent {
  @ViewChild('errorModal') errorModal: any;

  firstImageSelected = false;
  allFiles: FileData[] = [];

  constructor(private modalService: NgbModal) {}

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

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.allFiles.push({ file, url: reader.result as string });
      };
      reader.readAsDataURL(file);
    });

    if (inputNumber === 1) this.firstImageSelected = true;
  }
}
