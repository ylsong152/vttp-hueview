import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColorStore } from './color.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  selectedColorRGB: string = '';
  selectedColorHex: string = '';
  isEnlarged = false;

  constructor(private router: Router, private colorStore: ColorStore) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  toggleImageSize() {
    this.isEnlarged = !this.isEnlarged;
  }

  onImageClick(event: MouseEvent) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      context!.drawImage(img, 0, 0);
      const rect = (event.target as HTMLImageElement).getBoundingClientRect();
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      const imageData = context!.getImageData(x, y, 1, 1).data;
      this.selectedColorRGB = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
      this.selectedColorHex = this.rgbToHex(
        imageData[0],
        imageData[1],
        imageData[2]
      );
    };
    img.src = this.imageUrl!;
  }

  rgbToHex(r: number, g: number, b: number): string {
    const hex = ((r << 16) | (g << 8) | b).toString(16);
    return '#' + ('000000' + hex).slice(-6);
  }

  navigateToPalette() {
    this.colorStore.setColor(this.selectedColorHex);
    this.router.navigate(['/palette'], {
      queryParams: { color: this.selectedColorHex },
    });
  }
}
