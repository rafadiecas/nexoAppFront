import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
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

  @Output() filesChanged = new EventEmitter<FileData[]>();
  allFiles: FileData[] = [];

  constructor(private modalService: NgbModal) {}

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    input.value = '';

    for (const file of fileArray) {
      if (!file.type.startsWith('image/')) {
        this.modalService.open(this.errorModal);
        return;
      }
    }

    const remainingSlots = 2 - this.allFiles.length;
    if (fileArray.length > remainingSlots) {
      this.modalService.open(this.maxModal);
      return;
    }

    fileArray.slice(0, remainingSlots).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.allFiles.push({file, url: reader.result as string});
        this.filesChanged.emit(this.allFiles);
      };
      reader.readAsDataURL(file);
    });
  }
  clearFiles(): void {
    this.allFiles = [];
    this.filesChanged.emit(this.allFiles);
  }

  onImageClick(i: number): void {
    this.allFiles.splice(i, 1);
    this.filesChanged.emit(this.allFiles);
  }
}
