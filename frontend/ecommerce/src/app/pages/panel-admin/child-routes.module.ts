import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Protección de rutas
import { AdminGuard } from '../../guards/admin.guard';

//Componentes
import { GestionCuentasComponent } from './gestion-cuentas/gestion-cuentas.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';

const childAdminRoutes: Routes = [
    {
        path: 'cuentas', 
        component: GestionCuentasComponent,
        canActivate: [ AdminGuard ],
        data: {titulo: 'Gestion de Cuentas de usuario'}
    },
    {
        path: 'productos',
        component: GestionProductosComponent,
        canActivate: [ AdminGuard ],
        data: {titulo: 'Gestion de productos'}
    }
];

@NgModule({
    imports: [ RouterModule.forChild(childAdminRoutes) ],
    exports: [ RouterModule ]
  })
  export class ChildAdminRoutesModule { }