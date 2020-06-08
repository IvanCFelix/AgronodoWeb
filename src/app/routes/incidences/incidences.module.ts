
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidencesComponent  } from './incidences.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule  } from '@agm/core';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ModalModule} from 'ngx-bootstrap/modal'
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: IncidencesComponent }];

@NgModule({
  declarations: [IncidencesComponent],
  providers: [ColorPickerService],
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    CommonModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyATXoq67AS8KQZhv9dXOZseCQaxuK1DbcQ",
      libraries: ["places", "drawing", "geometry"],
    }),
  ],
})
export class IncidencesModule {}
