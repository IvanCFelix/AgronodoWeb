import { Error500Component } from './home/pages/error500/error500.component';
import { Error404Component } from './home/pages/error404/error404.component';
import { MaintenanceComponent } from './home/pages/maintenance/maintenance.component';
import { LockComponent } from './home/pages/lock/lock.component';
import { RecoverComponent } from './home/pages/recover/recover.component';
import { RegisterComponent } from './home/pages/register/register.component';
import { LoginComponent } from './home/pages/login/login.component';
import { LayoutComponent } from '../layout/layout.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'test', loadChildren: './test2/test2.module#Test2Module' },
            { path: 'Admin-Agronodo', loadChildren: './admin-agronodo/admin-agronodo.module#AdminAgronodoModule' },
            { path: 'Admin-Edit/new', loadChildren: './admin-edit-agronodo/admin-edit-agronodo.module#AdminEditAgronodoModule'},
            { path: 'Admin-Edit/:id', loadChildren: './admin-edit-id-agronodo/admin-edit-id-agronodo.module#AdminEditIDAgronodoModule' },
            { path: 'Agroindustrias-Agronodo', loadChildren: './agroindustrias-agronodo/agroindustrias-agronodo.module#AgroindustriasAgronodoModule' },
        ]
    },

    // Not found
   
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
    { path: '**', redirectTo: 'home' }
];
