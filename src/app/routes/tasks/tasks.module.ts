
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent} from './tasks.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule} from 'ngx-bootstrap/modal'
import { AgmCoreModule  } from '@agm/core';

const routes: Routes = [
  { path: '', component: TasksComponent },
];

@NgModule({
  declarations: [TasksComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    ModalModule.forRoot(),
    NgxDatatableModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyATXoq67AS8KQZhv9dXOZseCQaxuK1DbcQ",
      libraries: ["places", "drawing", "geometry"],
    }),
  ],
})
export class TaskModule {}
