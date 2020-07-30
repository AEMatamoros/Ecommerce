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

//Modulos
import { PagesAdminModule } from './pages/panel-admin/panel-admin.module';
import { PagesHomeModule } from './pages/home/home.module';
import { SharedHomeModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
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
