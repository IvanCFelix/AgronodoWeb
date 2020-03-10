
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotsComponent  } from './lots.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule  } from '@agm/core';

const routes: Routes = [
  { path: '', component: LotsComponent },
];

@NgModule({
  declarations: [LotsComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA',
      libraries: ['places', 'drawing', 'geometry'],
  })
  ]
})
export class LotsModule { }
