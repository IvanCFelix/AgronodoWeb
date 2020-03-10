
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgricolaEditComponent} from './agricola-edit.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
const routes: Routes = [
  { path: '', component: AgricolaEditComponent },
];

@NgModule({
  declarations: [AgricolaEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageCropperModule,
    RouterModule.forChild(routes)
  ]
})
export class AgricolaEditModule { }
