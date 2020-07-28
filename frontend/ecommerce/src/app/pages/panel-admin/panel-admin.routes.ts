import { RouterModule, Routes } from '@angular/router';

//Pages
import { GestionCuentasComponent } from './gestion-cuentas/gestion-cuentas.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';

const pagesAdminRoutes: Routes = [
    {path: 'cuentas', component: GestionCuentasComponent, data: {titulo: 'Gestion de Cuentas'} },
    {path: 'productos', component: GestionProductosComponent, data: {titulo: 'Gestion de Productos'}},
    {path: '', redirectTo: '/admin', pathMatch: 'full'}
];

export const PAGES_ADMIN_ROUTES = RouterModule.forChild( pagesAdminRoutes );