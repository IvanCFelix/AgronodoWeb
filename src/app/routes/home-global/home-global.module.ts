
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGlobalComponent  } from './home-global.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomeAgricolaComponent  } from '../home-agricola/home-agricola.component'
import { HomeAgronodoComponent  } from '../home-agronodo/home-agronodo.component'
import { ChartsModule  } from "ng2-charts/ng2-charts";
import { SharedModule } from "../../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
const routes: Routes = [
  { path: '', component: HomeGlobalComponent },
];

@NgModule({
  declarations: [
    HomeGlobalComponent,
    HomeAgricolaComponent,
    HomeAgronodoComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    ImageCropperModule,
    SharedModule,
    ChartsModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeGlobalModule {}
