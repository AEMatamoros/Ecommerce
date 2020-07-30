import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './pages/home/home.routing'
import { AdminRoutingModule } from './pages/panel-admin/panel-admin.routing';
//Global Pages
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';



const routes: Routes = [
  {path: 'registro', component: RegisterComponent},
  {path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [
    AdminRoutingModule,
    HomeRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
