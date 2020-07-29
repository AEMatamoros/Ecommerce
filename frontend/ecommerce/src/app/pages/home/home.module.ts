import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'; 

//rutas
import { PAGES_HOME_ROUTES } from './home.routes';

//Componentes globales 
import { SharedHomeModule } from '../../components/shared/shared.module';

//Componentes
import { PerfilComponent } from './perfil/perfil.component';
import { CreateComponent } from './products/create/create.component';
import { UpdateComponent } from './products/update/update.component';
import { DeleteComponent } from './products/delete/delete.component';
import { MyproductsComponent } from './products/myproducts/myproducts.component';


@NgModule({
    declarations: [
        // PagesHomeComponent,
        PerfilComponent,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        MyproductsComponent
    ],
    exports: [
        PerfilComponent,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        MyproductsComponent
    ],
    imports: [      
        PAGES_HOME_ROUTES,
        CommonModule,
        FormsModule,
        SharedHomeModule
    ]
})
export class PagesHomeModule { }
