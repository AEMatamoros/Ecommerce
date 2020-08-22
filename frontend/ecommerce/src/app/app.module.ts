import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, OnInit, ApplicationRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//Componentes
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

//Modulos
import { PagesAdminModule } from './pages/panel-admin/panel-admin.module';
import { PagesHomeModule } from './pages/home/home.module';
import { SharedHomeModule } from './components/shared/shared.module';
import { VentasComponent } from './pages/home/ventas/ventas/ventas.component';


import { EventEmitterService } from './services/shared/event-emitter.service';
//SW
import {SwPush, SwUpdate} from '@angular/service-worker'
import { interval } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VentasComponent
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
  providers: [DatePipe,
              EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit{ 
  constructor(private update:SwUpdate, private push:SwPush, private appRef:ApplicationRef){/*this.updateClient;this.checkUpdate()*/}

  ngOnInit(){
    
  }
  /*
  updateClient(){
     if (this.update.isEnabled){
       console.log("No Disponibe")
       return;
     }

     this.update.available.subscribe((event)=>{
       console.log('En uso', event.current, 'Disponible', event.available)
       if(confirm("Actualizacion Disponible por favor confirme la actualziacion")){
          this.update.activateUpdate().then(() => location.reload());
       }
     });

     this.update.activated.subscribe((event)=>{
       console.log('En uso', event.previous, 'Disponible', event.current)
     });
     

  }

  checkUpdate(){
    this.appRef.isStable.subscribe((isStable)=>{
      if (isStable){
        const timeInterval = interval(30000);

        timeInterval.subscribe(()=>{
          this.update.checkForUpdate().then(()=>console.log("Revisando"));
          console.log("Actualizacion Revisada");
        })
      }
    })
  }*/



}
