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
            { path: 'Agroindustrias-Agronodo',canActivate:[ AuthGuard ], loadChildren: './agroindustrias-agronodo/agroindustrias-agronodo.module#AgroindustriasAgronodoModule' },
            { path: 'Agroindustria/new', canActivate:[ AuthGuard ],loadChildren: './agroindustrias-edit-agronodo/agroindustrias-edit-agronodo.module#AgroindustriasEditAgronodoModule'},
            { path: 'Agroindustria/:id',canActivate:[ AuthGuard ], loadChildren: './agroindustrias-edit-agronodo/agroindustrias-edit-agronodo.module#AgroindustriasEditAgronodoModule'},
            { path: 'Admin-Agricola',canActivate:[ AuthGuard ], loadChildren: './admin-agricola/admin-agricola.module#AdminAgricolaModule' },
            { path: 'Agricola-Edit/new',canActivate:[ AuthGuard ], loadChildren: './agricola-edit/agricola-edit.module#AgricolaEditModule' },
            { path: 'Agricola-Edit/:id', canActivate:[ AuthGuard ],loadChildren: './agricola-edit/agricola-edit.module#AgricolaEditModule' },

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
