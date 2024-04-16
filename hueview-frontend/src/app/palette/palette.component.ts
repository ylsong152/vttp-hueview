import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanvasBoxComponent } from '../canvas-box/canvas-box.component';
import { ColorStore } from '../main/color.store';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit, AfterViewInit {
  selectedColor: string = '';
  clickedColor: string = '';
  apiResponse$!: Observable<any>;
  complementaryColors$!: Observable<any>;
  monochromeDarkColors$!: Observable<any>;
  monochromeLightColors$!: Observable<any>;
  showCanvas = true;

  @ViewChild(CanvasBoxComponent) canvasBoxComponent!: CanvasBoxComponent;

  constructor(private http: HttpClient, private colorStore: ColorStore) {}

  ngOnInit() { 
    this.colorStore.color$.subscribe(color => { 
      this.selectedColor = color; 
      this.getSelectedColorInfo(color); 
      this.getComplementaryColors(color); 
      this.getMonochromeDarkColors(color); 
      this.getMonochromeLightColors(color); 
    }); 
  } 

  ngAfterViewInit(): void {
    if (this.canvasBoxComponent) {
      this.canvasBoxComponent.updateShirtColor(this.selectedColor);
    }
  }

  getSelectedColorInfo(color: string) {
    this.apiResponse$ = this.http.get(`https://www.thecolorapi.com/id?hex=${color}`);
  }

  getComplementaryColors(color: string) {
    this.complementaryColors$ = this.http.get(`https://www.thecolorapi.com/scheme?hex=${color}&mode=complement&count=20`);
  }

  getMonochromeDarkColors(color: string) {
    this.monochromeDarkColors$ = this.http.get(`https://www.thecolorapi.com/scheme?hex=${color}&mode=monochrome-dark&count=20`);
  }

  getMonochromeLightColors(color: string) {
    this.monochromeLightColors$ = this.http.get(`https://www.thecolorapi.com/scheme?hex=${color}&mode=monochrome-light&count=20`);
  }

  getColorName(color: any): string {
    return color.name.value;
  }

  getHexValue(color: any): string {
    return color.hex.value;
  }

  getRgbValue(color: any): string {
    return color.rgb.value;
  }

  getHslValue(color: any): string {
    return color.hsl.value;
  }

  handleShirtClick(color: any) {
    this.selectedColor = color.hex.value;
    this.clickedColor = color.hex.value;
    if (this.canvasBoxComponent) {
      this.canvasBoxComponent.updateShirtColor(color.hex.value);
    } else {
      console.warn('CanvasBoxComponent is not initialized');
    }
  }
  
  handlePantsClick(color: any) {
    this.selectedColor = color.hex.value;
    this.clickedColor = color.hex.value;
    if (this.canvasBoxComponent) {
      this.canvasBoxComponent.updatePantsColor(color.hex.value);
    } else {
      console.warn('CanvasBoxComponent is not initialized');
    }
  }

  handleSelectClick(color: any) {
    this.selectedColor = color.hex.value;
    this.colorStore.setColor(color.hex.value)
  }

}