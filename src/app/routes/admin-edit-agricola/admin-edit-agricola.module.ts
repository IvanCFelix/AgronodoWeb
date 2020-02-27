import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEditAgricolaComponent} from './admin-edit-agricola.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: AdminEditAgricolaComponent },
];

@NgModule({
  declarations: [AdminEditAgricolaComponent],
  imports: [
    CommonModule,
    ImageCropperModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminEditAgricolaModule { }
