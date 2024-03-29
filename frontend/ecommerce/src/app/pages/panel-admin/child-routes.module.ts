import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Protección de rutas
import { AdminGuard } from '../../guards/admin.guard';

//Componentes
import { GestionCuentasComponent } from './gestion-cuentas/gestion-cuentas.component';
import { CrearCuentaComponent } from './gestion-cuentas/crear-cuenta/crear-cuenta.component';

import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { CrearProductoComponent } from './gestion-productos/crear-producto/crear-producto.component';

import { GestionOrdenesComponent } from './gestion-ordenes/gestion-ordenes.component';
import { CrearOrdenComponent } from './gestion-ordenes/crear-orden/crear-orden.component';

import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';



const childAdminRoutes: Routes = [
    {
        path: 'datos',
        component: DashboardComponent,
        canActivate: [AdminGuard],
        data: {titulo: 'Dashboard'}
    },
    {
        path: 'perfil-admin',
        component: PerfilAdminComponent,
        canActivate: [AdminGuard],
        data: {titulo: 'Perfil de Administrador'}
    },
    {
        path: 'cuentas', 
        component: GestionCuentasComponent,
        canActivate: [ AdminGuard ],
        data: {titulo: 'Gestion de Cuentas de usuario'}
    },
    {
        path: 'cuentas/add',
        component: CrearCuentaComponent,
        canActivate: [ AdminGuard ],
        data: {titulo: 'Crear Cuenta de Usuario'}
    },
    {
        path: 'cuentas/edit/:id',
        component: CrearCuentaComponent,
        canActivate: [ AdminGuard ],
        data: {titulo: 'Editar Cuenta de Usuario'}
    },
    {
        path: 'productos',
        component: GestionProductosComponent,
        canActivate: [ AdminGuard ],
        data: {titulo: 'Gestion de productos'}
    },
    {
        path: 'productos/add',
        component: CrearProductoComponent,
        canActivate: [ AdminGuard ],
        data: {titulo: 'Crear nuevo producto'}
    },
    {
        path: 'productos/edit/:id',
        component: CrearProductoComponent,
        canActivate: [AdminGuard],
        data: {titulo: 'Editar producto'}
    },
    {
        path:'ordenes',
        component: GestionOrdenesComponent,
        canActivate: [AdminGuard],
        data: {titulo: 'Control de Ordenes de productos'}
    },
    {
        path:'ordenes/add',
        component: CrearOrdenComponent,
        canActivate: [AdminGuard],
        data: {titulo:'Crear nueva orden'}
    }
];

@NgModule({
    imports: [ RouterModule.forChild(childAdminRoutes) ],
    exports: [ RouterModule ]
  })
  export class ChildAdminRoutesModule { }