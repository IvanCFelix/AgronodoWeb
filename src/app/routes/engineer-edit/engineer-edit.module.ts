import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerEditComponent} from './engineer-edit.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: EngineerEditComponent },
];

@NgModule({
  declarations: [EngineerEditComponent],
  imports: [
    CommonModule,
    ImageCropperModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EditEngineerModule { }
