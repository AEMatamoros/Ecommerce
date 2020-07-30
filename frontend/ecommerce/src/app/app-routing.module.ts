import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Global Pages
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

//Routing
import { AdminRoutingModule } from './pages/panel-admin/panel-admin.routing';
import { HomeRoutingModule } from './pages/home/home.routing';

//Componentes
import{ InformacionComponent } from './pages/home/informacion/informacion.component';


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
