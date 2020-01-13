
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAgronodoComponent} from './admin-agronodo.component'
const routes: Routes = [
  { path: '', component: AdminAgronodoComponent },
];

@NgModule({
  declarations: [AdminAgronodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminAgronodoModule { }
