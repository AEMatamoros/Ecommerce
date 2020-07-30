import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/*Protección de rutas*/ 
import { AuthGuard } from '../../guards/auth.guard';

import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./child-routes.module').then( m => m.ChildHomeRoutesModule )
   
    }
];
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {}