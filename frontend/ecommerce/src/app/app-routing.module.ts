import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './pages/home/home.routing'
import { AdminRoutingModule } from './pages/panel-admin/panel-admin.routing';
//Global Pages
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { Pagina404Component } from './pages/home/pagina404/pagina404.component';



const routes: Routes = [
  {path: 'registro', component: RegisterComponent},
  {path: 'login', component: LoginComponent },
  { path: '**', component: Pagina404Component}
];


@NgModule({
  imports: [
    AdminRoutingModule,
    HomeRoutingModule,
    RouterModule.forRoot(routes,{
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
