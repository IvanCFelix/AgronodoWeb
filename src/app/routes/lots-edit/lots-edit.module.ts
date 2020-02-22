
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotsEditComponent  } from './lots-edit.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule,PolylineManager  } from '@agm/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ModalModule} from 'ngx-bootstrap/modal'

const routes: Routes = [
  { path: '', component: LotsEditComponent },
];

@NgModule({
  declarations: [LotsEditComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    NgxDatatableModule,
    BsDatepickerModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA',
      libraries: ['places', 'drawing', 'geometry'],
  })
  ]
})
export class LotsEditModule { }
