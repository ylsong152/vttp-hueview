import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasBoxComponent } from './canvas-box.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CanvasBoxComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    CanvasBoxComponent
  ]
})
export class CanvasBoxModule { }
