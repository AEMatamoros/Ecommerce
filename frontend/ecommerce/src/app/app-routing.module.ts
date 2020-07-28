import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Global Pages
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

//Products
import { MyproductsComponent } from './pages/home/products/myproducts/myproducts.component';
//Componentes
import { HomeComponent } from './pages/home/home.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import{ InformacionComponent } from './pages/informacion/informacion.component';


const routes: Routes = [
  {path: 'registro', component: RegisterComponent},
  {path: 'login', component: LoginComponent },
  {path:'informacion',component:InformacionComponent},

  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./pages/home/home.module').then(m => m.PagesHomeModule)
  },
  {
    path: 'admin',
    component: PanelAdminComponent,
    loadChildren: () => import('./pages/panel-admin/panel-admin.module').then(m => m.PagesAdminModule)
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
