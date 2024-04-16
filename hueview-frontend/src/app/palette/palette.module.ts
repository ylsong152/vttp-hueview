import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaletteComponent } from './palette.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { CanvasBoxModule } from '../canvas-box/canvas-box.module';

@NgModule({
  declarations: [
    PaletteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    CanvasBoxModule
  ],
  exports: [
    PaletteComponent
  ]
})
export class PaletteModule { }