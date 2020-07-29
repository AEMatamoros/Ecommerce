import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

//rutas
import { PAGES_HOME_ROUTES } from './home.routes';

//Componentes globales
import { SharedHomeModule } from '../../components/shared/shared.module';

//Componentes
import { PerfilComponent } from './perfil/perfil.component';
import { MyproductsComponent } from './products/myproducts/myproducts.component';
import { CreateComponent } from './products/create/create.component';
import { UpdateComponent } from './products/update/update.component';
import { DeleteComponent } from './products/delete/delete.component';


import { ComprasComponent } from './compras/compras.component';


@NgModule({
    declarations: [
        PerfilComponent,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        MyproductsComponent,
        ComprasComponent
    ],
    exports: [
        PerfilComponent,
        MyproductsComponent,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        ComprasComponent
    ],
    imports: [
        PAGES_HOME_ROUTES,
        RouterModule,
        CommonModule,
        FormsModule,
        SharedHomeModule
    ]
})
export class PagesHomeModule { }
