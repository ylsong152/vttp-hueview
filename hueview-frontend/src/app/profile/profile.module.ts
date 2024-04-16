import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatButton } from '@angular/material/button';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatButton
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
