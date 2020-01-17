
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEditAgronodoComponent} from './admin-edit-agronodo.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';

const routes: Routes = [
  { path: '', component: AdminEditAgronodoComponent },
];

@NgModule({
  declarations: [AdminEditAgronodoComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminEditAgronodoModule { }
