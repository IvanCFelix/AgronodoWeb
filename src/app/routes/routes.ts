import { AuthGuard } from './../guard/auth.guard';
import { Error500Component } from './home/pages/error500/error500.component';
import { Error404Component } from './home/pages/error404/error404.component';
import { LandingComponent } from './home/pages/landing/landing.component';
import { LockComponent } from './home/pages/lock/lock.component';
import { RegisterComponent } from './home/pages/register/register.component';
import { LoginComponent } from './home/pages/login/login.component';
import { LayoutComponent } from '../layout/layout.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', canActivate:[ AuthGuard ], redirectTo: '/landing', pathMatch: 'full' },
            { path: 'home',canActivate:[ AuthGuard ], loadChildren: './home-agronodo/home-agronodo.module#HomeAgronodoModule' },
            { path: 'Admin-Agronodo', canActivate:[ AuthGuard ],loadChildren: './admin-agronodo/admin-agronodo.module#AdminAgronodoModule' },
            { path: 'Admin-Edit/new',canActivate:[ AuthGuard ], loadChildren: './admin-edit-agronodo/admin-edit-agronodo.module#AdminEditAgronodoModule'},
            { path: 'Admin-Edit/:id',canActivate:[ AuthGuard ], loadChildren: './admin-edit-agronodo/admin-edit-agronodo.module#AdminEditAgronodoModule' },
            { path: 'Agricola',canActivate:[ AuthGuard ], loadChildren: './agricola-agronodo/agricola-agronodo.module#AgricolaAgronodoModule' },
            { path: 'Agricola/new', canActivate:[ AuthGuard ],loadChildren: './agricola-edit-agronodo/agricola-edit-agronodo.module#AgricolaEditAgronodoModule'},
            { path: 'Agricola/:id',canActivate:[ AuthGuard ], loadChildren: './agricola-edit-agronodo/agricola-edit-agronodo.module#AgricolaEditAgronodoModule'},
        ]   
    },

    // Not found
   
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'lock', component: LockComponent },
    { path: 'landing', component: LandingComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
    { path: '**', redirectTo: '/landing' }
];
