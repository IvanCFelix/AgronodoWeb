import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEditEngineerComponent} from './admin-edit-engineer.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: AdminEditEngineerComponent },
];

@NgModule({
  declarations: [AdminEditEngineerComponent],
  imports: [
    CommonModule,
    ImageCropperModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminEditEngineerModule { }
