
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { AdminEditIDAgronodoComponent } from './admin-edit-id-agronodo.component';

const routes: Routes = [
  { path: '', component: AdminEditIDAgronodoComponent },
];

@NgModule({
  declarations: [AdminEditIDAgronodoComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminEditIDAgronodoModule { }
