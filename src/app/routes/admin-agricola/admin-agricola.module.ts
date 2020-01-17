
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAgricolaComponent} from './admin-agricola.component'
const routes: Routes = [
  { path: '', component: AdminAgricolaComponent },
];

@NgModule({
  declarations: [AdminAgricolaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminAgricolaModule { }
