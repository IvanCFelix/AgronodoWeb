import { AgricolaAgronodoComponent } from './agricola-agronodo.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  { path: '', component: AgricolaAgronodoComponent },
];

@NgModule({
  declarations: [AgricolaAgronodoComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    NgxDatatableModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AgricolaAgronodoModule { }
