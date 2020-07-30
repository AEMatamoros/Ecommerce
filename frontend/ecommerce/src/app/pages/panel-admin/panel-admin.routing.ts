import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../guards/auth.guard';

import { PanelAdminComponent } from './panel-admin.component';


const routes: Routes = [
    { 
        path: 'admin', 
        component: PanelAdminComponent,
        //canActivate: [ AuthGuard ],
        //canLoad: [ AuthGuard ],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildAdminRoutesModule )
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AdminRoutingModule {}
