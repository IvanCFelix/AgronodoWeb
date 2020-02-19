import { FilteadminPipe } from '../../pipes/filteadmin.pipe';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEditAgricolaComponent} from './admin-edit-agricola.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  { path: '', component: AdminEditAgricolaComponent },
];

@NgModule({
  declarations: [AdminEditAgricolaComponent,FilteadminPipe],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminEditAgricolaModule { }
