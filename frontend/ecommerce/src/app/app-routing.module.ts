import { NgModule, Component } from '@angular/core';
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
import{ InicioComponent } from './inicio/inicio.component';
import{CarruselComponent} from './inicio/carrusel/carrusel.component';
import{CardsComponent} from './inicio/cards/cards.component';
//Footer
import{ FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegisterComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [ AuthGuard ]}, /*Si quieren probar la ruta quiten el canActivate*/ 
  {path: 'compras',  component: ComprasComponent },
  {path: 'inicio',component: InicioComponent},
  {path:'carrusel',component:CarruselComponent},
  {path:'cards',component:CardsComponent},
  {path: 'footer',component: FooterComponent},
  {path: 'update_product',  component: UpdateComponent },
  {path: 'my_products',  component: MyproductsComponent },
  {path: 'detalle',  component: DetalleProductoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
