import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

//Componentes
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component'; 

//Modulos
import { PagesAdminModule } from './pages/panel-admin/panel-admin.module';
import { PagesHomeModule } from './pages/home/home.module';
import { SharedHomeModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
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
    PagesAdminModule,
    PagesHomeModule,
    SharedHomeModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
