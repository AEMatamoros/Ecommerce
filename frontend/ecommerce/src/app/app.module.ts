import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
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

import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './pages/products/update/update.component';
import { MyproductsComponent } from './pages/products/myproducts/myproducts.component';
import { DeleteComponent } from './pages/products/delete/delete.component';
import { CreateComponent } from './pages/products/create/create.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CardsComponent } from './pages/home/cards/cards.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';

import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { HeaderComponent } from './components/shared/panelAdmin/header/header.component';
import { SidebarComponent } from './components/shared/panelAdmin/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './components/shared/panelAdmin/breadcrumbs/breadcrumbs.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PanelAdminComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    LoginComponent,
    PerfilComponent,
    RegisterComponent,
    UpdateComponent,
    MyproductsComponent,
    DeleteComponent,
    CreateComponent,
    DetalleProductoComponent,
    ComprasComponent,
    
    CardsComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
