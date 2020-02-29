import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { LockComponent } from './lock/lock.component';
import { LandingComponent } from './landing/landing.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { ModalModule} from 'ngx-bootstrap/modal';

/* Use this routes definition in case you want to make them lazy-loaded */
/*const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
];*/

@NgModule({
    imports: [
        SharedModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        // RouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        RecoverComponent,
        LockComponent,
        LandingComponent,
        Error404Component,
        Error500Component
    ],
    exports: [
        RouterModule,
        LoginComponent,
        RegisterComponent,
        RecoverComponent,
        LockComponent,
        LandingComponent,
        Error404Component,
        Error500Component
    ]
})
export class PagesModule { }
