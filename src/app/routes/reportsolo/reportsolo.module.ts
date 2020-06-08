import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsoloComponent } from './reportsolo.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule  } from '@agm/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ModalModule} from 'ngx-bootstrap/modal'
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AgmDirectionModule } from 'agm-direction';
import { CarouselModule } from "ngx-owl-carousel-o";
const routes: Routes = [
  { path: '', component: ReportsoloComponent },
];

@NgModule({
  declarations: [ReportsoloComponent],
  imports: [
    ColorPickerModule,
    CarouselModule,
    ReactiveFormsModule,
    AgmDirectionModule,
    ImageCropperModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyATXoq67AS8KQZhv9dXOZseCQaxuK1DbcQ",
      libraries: ["places", "drawing", "geometry"],
    }),
  ],
})
export class ReportSoloModule {}
