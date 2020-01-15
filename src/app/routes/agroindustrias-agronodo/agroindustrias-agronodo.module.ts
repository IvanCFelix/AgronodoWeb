import { AgroindustriasAgronodoComponent } from './agroindustrias-agronodo.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';

const routes: Routes = [
  { path: '', component: AgroindustriasAgronodoComponent },
];

@NgModule({
  declarations: [AgroindustriasAgronodoComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AgroindustriasAgronodoModule { }
