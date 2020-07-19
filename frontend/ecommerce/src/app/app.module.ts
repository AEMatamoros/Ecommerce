import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { LoginComponent } from './components/auth/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './pages/products/update/update.component';
import { MyproductsComponent } from './pages/products/myproducts/myproducts.component';
import { DeleteComponent } from './pages/products/delete/delete.component';
import { CreateComponent } from './pages/products/create/create.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PerfilComponent,
    RegisterComponent,
    UpdateComponent,
    MyproductsComponent,
    DeleteComponent,
    CreateComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
