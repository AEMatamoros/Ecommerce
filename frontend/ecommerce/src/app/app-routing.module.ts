import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Global Pages
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ComprasComponent } from './pages/compras/compras.component';

//Componentes
import{ InformacionComponent } from './pages/home/informacion/informacion.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'usuario', component: UsuarioComponent },
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
