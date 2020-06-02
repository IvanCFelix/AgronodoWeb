
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAgricolaComponent  } from './home-agricola.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from "../../shared/shared.module";
import { ChartsModule as Ng2ChartsModule } from "ng2-charts/ng2-charts";



const routes: Routes = [
  { path: '', component: HomeAgricolaComponent },
];

@NgModule({
  declarations: [HomeAgricolaComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ImageCropperModule,
    Ng2ChartsModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeAgricolaModule {}
