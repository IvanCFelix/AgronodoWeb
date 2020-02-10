
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent} from './profile.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';

const routes: Routes = [
  { path: '', component: ProfileComponent },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileAgronodoModule { }
