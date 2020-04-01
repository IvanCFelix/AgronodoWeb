import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerComponent } from './engineer.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  { path: '', component: EngineerComponent },
];

@NgModule({
  declarations: [EngineerComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EngineerModule { }
