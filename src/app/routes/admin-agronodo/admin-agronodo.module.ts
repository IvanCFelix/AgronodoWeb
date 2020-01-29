import { FilteadminPipe } from '../../pipes/filteadmin.pipe';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAgronodoComponent} from './admin-agronodo.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  { path: '', component: AdminAgronodoComponent },
];

@NgModule({
  declarations: [AdminAgronodoComponent,FilteadminPipe],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminAgronodoModule { }
