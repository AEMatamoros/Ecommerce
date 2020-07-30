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

@NgModule({
    declarations: [
        PanelAdminComponent,
        GestionCuentasComponent,
        GestionProductosComponent
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