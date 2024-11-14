import {Component, HostListener, ViewChild} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {FileData} from '../../modelos/FileData';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-share',
  standalone: true,
    imports: [
        MatGridList,
        MatGridTile,
        MatIcon,
        NgForOf,
        NgIf
    ],
  templateUrl: './input-share.component.html',
  styleUrl: './input-share.component.css'
})
export class InputShareComponent {
  @ViewChild('errorModal') errorModal: any;
  @ViewChild('maxmodal') maxModal: any;

  firstImageSelected = false;
  allFiles: FileData[] = [];

  constructor(private modalService: NgbModal) {
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        this.modalService.open(this.errorModal);
        return;
      }
    }

    const remainingSlots = 2 - this.allFiles.length;
    if (files.length > remainingSlots) {
      this.modalService.open(this.maxModal);
      input.value = '';
      return;
    }


    Array.from(files).slice(0, remainingSlots).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.allFiles.push({file, url: reader.result as string});
      };
      reader.readAsDataURL(file);
    });
  }


onImageClick(i: number): void {
      this.allFiles.splice(i, 1);
  }
}
