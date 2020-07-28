import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//PWA Services worker
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//Componentes
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component'; 
import { HomeComponent } from './pages/home/home.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';

//Modulos
import { SharedHomeModule } from './components/shared/shared.module';
import { SharedAdminModule } from './components/shared/panelAdmin/sharedAdmin.module';
import { InformacionComponent } from './pages/informacion/informacion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelAdminComponent,
    LoginComponent,
    RegisterComponent,
    InformacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    SharedHomeModule,
    SharedAdminModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
