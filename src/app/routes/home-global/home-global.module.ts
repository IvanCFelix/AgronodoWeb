
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGlobalComponent  } from './home-global.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomeAgricolaComponent  } from '../home-agricola/home-agricola.component'
import { HomeAgronodoComponent  } from '../home-agronodo/home-agronodo.component'

const routes: Routes = [
  { path: '', component: HomeGlobalComponent },
];

@NgModule({
  declarations: [HomeGlobalComponent,HomeAgricolaComponent,HomeAgronodoComponent],
  imports: [
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeGlobalModule { }
