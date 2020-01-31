import { AgricolaEditAgronodoComponent } from './agricola-edit-agronodo.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';

const routes: Routes = [
  { path: '', component: AgricolaEditAgronodoComponent },
];

@NgModule({
  declarations: [AgricolaEditAgronodoComponent],
  providers: [ColorPickerService],
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AgricolaEditAgronodoModule { }
