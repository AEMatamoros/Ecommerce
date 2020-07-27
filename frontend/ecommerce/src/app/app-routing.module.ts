import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Protección de rutas*/ 
import { AuthGuard } from 'src/app/guards/auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

import { ComprasComponent } from './pages/compras/compras.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';


// Products
import { UpdateComponent } from './pages/products/update/update.component'; // Modal
import { MyproductsComponent } from './pages/products/myproducts/myproducts.component'; // Modal
//Inicio
import{ HomeComponent } from './pages/home/home.component';
import{CardsComponent} from './pages/home/cards/cards.component';

import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {
    path: 'admin', component: PanelAdminComponent
  },
  {path: 'registro', component: RegisterComponent},
  {path: 'login', component: LoginComponent },
  {path: 'perfil', component: PerfilComponent, canActivate: [ AuthGuard ]}, /*Si quieren probar la ruta quiten el canActivate*/ 
  {path: 'compras',  component: ComprasComponent },
  {path: 'update_product',  component: UpdateComponent },
  {path: 'my_products',  component: MyproductsComponent },
  {path: 'detalle',  component: DetalleProductoComponent },
  {path:'cards',component:CardsComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path:'**', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
