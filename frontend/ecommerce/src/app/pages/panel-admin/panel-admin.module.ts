import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Rutas
import { PAGES_ADMIN_ROUTES } from './panel-admin.routes';
import { SharedAdminModule } from '../../components/shared/panelAdmin/sharedAdmin.module';

//Componentes
import { GestionCuentasComponent } from './gestion-cuentas/gestion-cuentas.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';

@NgModule({
    declarations: [
        // PagesAdminComponent
        GestionCuentasComponent,
        GestionProductosComponent
    ],
    exports: [
        GestionCuentasComponent,
        GestionProductosComponent
    ],
    imports: [      
        PAGES_ADMIN_ROUTES,
        SharedAdminModule,
        CommonModule,
        FormsModule
    ]
})
export class PagesAdminModule { }
