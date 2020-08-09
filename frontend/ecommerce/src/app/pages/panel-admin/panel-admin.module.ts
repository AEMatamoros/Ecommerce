import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulos
import { SharedAdminModule } from '../../components/shared/panelAdmin/sharedAdmin.module';

//Componentes
import { PanelAdminComponent } from './panel-admin.component';
import { GestionCuentasComponent } from './gestion-cuentas/gestion-cuentas.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { CrearCuentaComponent } from './gestion-cuentas/crear-cuenta/crear-cuenta.component';
import { CrearProductoComponent } from './gestion-productos/crear-producto/crear-producto.component';
import { GestionOrdenesComponent } from './gestion-ordenes/gestion-ordenes.component';
import { CrearOrdenComponent } from './gestion-ordenes/crear-orden/crear-orden.component';

@NgModule({
    declarations: [
        PanelAdminComponent,
        GestionCuentasComponent,
        GestionProductosComponent,
        CrearCuentaComponent,
        CrearProductoComponent,
        GestionOrdenesComponent,
        CrearOrdenComponent
    ],
    exports: [
        PanelAdminComponent,
        GestionCuentasComponent,
        GestionProductosComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedAdminModule
    ]
})
export class PagesAdminModule{}