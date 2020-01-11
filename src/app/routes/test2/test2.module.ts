import { Test2Component } from './test2.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: Test2Component },
];

@NgModule({
  declarations: [Test2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Test2Module { }
