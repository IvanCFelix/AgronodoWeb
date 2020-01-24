import { AgroindustriasAgronodoComponent } from './agroindustrias-agronodo.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  { path: '', component: AgroindustriasAgronodoComponent },
];

@NgModule({
  declarations: [AgroindustriasAgronodoComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    NgxDatatableModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AgroindustriasAgronodoModule { }
