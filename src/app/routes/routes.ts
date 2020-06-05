import { AuthGuard } from './../guard/auth.guard';
import { Error500Component } from './home/pages/error500/error500.component';
import { Error404Component } from './home/pages/error404/error404.component';
import { LandingComponent } from './home/pages/landing/landing.component';
import { LockComponent } from './home/pages/lock/lock.component';
import { RegisterComponent } from './home/pages/register/register.component';
import { LoginComponent } from './home/pages/login/login.component';
import { LayoutComponent } from '../layout/layout.component';
import { RoleGuard } from '../guard/role.guard';


export const routes = [
         {
           path: "",
           component: LayoutComponent,
           children: [
             {
               path: "",
               canActivate: [AuthGuard],
               redirectTo: "/landing",
               pathMatch: "full",
             },
             {
               path: "home",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 2, role2: 4, role3: 6 },
               loadChildren:
                 "./home-global/home-global.module#HomeGlobalModule",
             },

             {
               path: "Admin-Agronodo",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 2 },
               loadChildren:
                 "./admin-agronodo/admin-agronodo.module#AdminAgronodoModule",
             },
             {
               path: "Admin-Edit/new",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 2 },
               loadChildren:
                 "./admin-edit-agronodo/admin-edit-agronodo.module#AdminEditAgronodoModule",
             },
             {
               path: "Admin-Edit/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 2 },
               loadChildren:
                 "./admin-edit-agronodo/admin-edit-agronodo.module#AdminEditAgronodoModule",
             },
             {
               path: "Agricola",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 2 },
               loadChildren:
                 "./agricola-agronodo/agricola-agronodo.module#AgricolaAgronodoModule",
             },
             {
               path: "Agricola/new",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 2 },
               loadChildren:
                 "./agricola-edit-agronodo/agricola-edit-agronodo.module#AgricolaEditAgronodoModule",
             },
             {
               path: "Agricola/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 2 },
               loadChildren:
                 "./agricola-edit-agronodo/agricola-edit-agronodo.module#AgricolaEditAgronodoModule",
             },

             {
               path: "profile/:id",
               loadChildren:
                 "./profile/profile.component.module#ProfileAgronodoModule",
             },

             {
               path: "Admin-Agricola",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4 },
               loadChildren:
                 "./admin-agricola/admin-agricola.module#AdminIngAgricolaModule",
             },
             {
               path: "Admin-Agricola/new",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4 },
               loadChildren:
                 "./admin-edit-agricola/admin-edit-agricola.module#AdminEditAgricolaModule",
             },
             {
               path: "Admin-Agricola/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4 },
               loadChildren:
                 "./admin-edit-agricola/admin-edit-agricola.module#AdminEditAgricolaModule",
             },

             {
               path: "Lotes",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6 },
               loadChildren: "./lots/lots.module#LotsModule",
             },
             {
               path: "Lotes/new",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6 },
               loadChildren: "./lots-edit/lots-edit.module#LotsEditModule",
             },
             {
               path: "Lotes/:lot/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6 },
               loadChildren: "./lots-edit/lots-edit.module#LotsEditModule",
             },
             {
               path: "Sublote/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6 },
               loadChildren: "./lots-edit/lots-edit.module#LotsEditModule",
             },

             {
               path: "Admin-Ingeniero",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role3: 5 },
               loadChildren:
                 "./admin-engineer/admin-engineer.module#AdminEnginerModule",
             },
             {
               path: "Admin-Ingeniero/new",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role3: 5 },
               loadChildren:
                 "./admin-edit-engineer/admin-edit-engineer.module#AdminEditEngineerModule",
             },
             {
               path: "Admin-Ingeniero/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role3: 5 },
               loadChildren:
                 "./admin-edit-engineer/admin-edit-engineer.module#AdminEditEngineerModule",
             },

             {
               path: "Ingeniero",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren: "./engineer/engineer.module#EngineerModule",
             },
             {
               path: "Ingeniero/new",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren:
                 "./engineer-edit/engineer-edit.module#EditEngineerModule",
             },
             {
               path: "Ingeniero/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren:
                 "./engineer-edit/engineer-edit.module#EditEngineerModule",
             },

             {
               path: "Lotes/cicle/:lot/:sub",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6 },
               loadChildren: "./cicle/cicle.module#CicleModule",
             },
             {
               path: "Lotes/reportes/:lot/:sub/:rut",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6 },
               loadChildren: "./reports/reports.module#ReportsModule",
             },
             {
               path: "Lotes/reporte/:lot/:sub/:rut/:repso",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren: "./reportsolo/reportsolo.module#ReportSoloModule",
             },

             {
               path: "Tareas",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren: "./tasks/tasks.module#TaskModule",
             },
             {
               path: "Tareas/new",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren: "./task-edit/task-edit.module#TaskEditModule",
             },
             {
               path: "Tareas/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren: "./task-edit/task-edit.module#TaskEditModule",
             },
             {
               path: "Incidencias",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren: "./incidences/incidences.module#IncidencesModule",
             },
             {
               path: "Incidencias/:id",
               canActivate: [AuthGuard, RoleGuard],
               data: { role: 4, role2: 6, role3: 5 },
               loadChildren:
                 "./incidences-view/incidences.view.module#IncidencesViewModule",
             },
           ],
         },

         // Not found

         { path: "login", component: LoginComponent },
         // { path: 'register', component: RegisterComponent },
         { path: "reset/:user/:token", component: LockComponent },
         { path: "reset/:password", component: LockComponent },
         { path: "landing", component: LandingComponent },
         { path: "404", component: Error404Component },
         { path: "500", component: Error500Component },
         { path: "**", redirectTo: "/landing" },
       ];
