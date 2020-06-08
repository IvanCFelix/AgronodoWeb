
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskEditComponent  } from './task-edit.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule  } from '@agm/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';
import { ModalModule} from 'ngx-bootstrap/modal'

const routes: Routes = [
  { path: '', component: TaskEditComponent },
];

@NgModule({
  declarations: [TaskEditComponent],
  providers: [ColorPickerService],
  imports: [
    ColorPickerModule,
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    NgxDatatableModule,
    BsDatepickerModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyATXoq67AS8KQZhv9dXOZseCQaxuK1DbcQ",
      libraries: ["places", "drawing", "geometry"],
    }),
  ],
})
export class TaskEditModule {}
