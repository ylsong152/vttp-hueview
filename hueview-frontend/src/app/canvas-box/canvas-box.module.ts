import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasBoxComponent } from './canvas-box.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    CanvasBoxComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [
    CanvasBoxComponent
  ]
})
export class CanvasBoxModule { }
