import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CicleComponent } from './cicle.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule  } from '@agm/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ModalModule} from 'ngx-bootstrap/modal'
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AgmDirectionModule } from 'agm-direction';

const routes: Routes = [
  { path: '', component: CicleComponent },
];

@NgModule({
  declarations: [CicleComponent],
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    AgmDirectionModule,
    ImageCropperModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14",
      libraries: ["places", "drawing", "geometry"],
    }),
  ],
})
export class CicleModule {}
