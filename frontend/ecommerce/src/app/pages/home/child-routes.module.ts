import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Protección de rutas
import { AuthGuard } from '../../guards/auth.guard';

//Componentes
import { PerfilComponent } from './perfil/perfil.component';
import { InformacionComponent } from './informacion/informacion.component';
import { MyproductsComponent } from './products/myproducts/myproducts.component';
import { ComprasComponent } from './compras/compras.component';
import { LandingComponent } from './landing/landing.component';
import { OffersComponent } from './offers/offers.component';

const childHomeRoutes: Routes = [
    {
        path: 'landing',
        component: LandingComponent
    },
    {
        path: 'perfil', 
        component: PerfilComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'about',
        component: InformacionComponent
    },
    {
        path: 'misProductos',
        component: MyproductsComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'compras',
        component: ComprasComponent
    },
    {
        path: 'offers',
        component: OffersComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(childHomeRoutes) ],
    exports: [ RouterModule ]
  })
  export class ChildHomeRoutesModule { }