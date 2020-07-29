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
import { LandingComponent } from './landing/landing.component';
import { CorouselImgComponent } from './landing/corousel-img/corousel-img.component';
import { BoxCardsComponent } from './landing/box-cards/box-cards.component';
import { CardsComponent } from './landing/cards/cards.component';
import { CorouselCardsComponent } from './landing/corousel-cards/corousel-cards.component';


@NgModule({
    declarations: [
        // PagesHomeComponent,
        PerfilComponent,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        MyproductsComponent,
        LandingComponent,
        CorouselImgComponent,
        BoxCardsComponent,
        CardsComponent,
        CorouselCardsComponent
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
