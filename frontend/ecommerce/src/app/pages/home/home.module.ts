import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Modulo
import { SharedHomeModule } from '../../components/shared/shared.module';

//Componentes
import { HomeComponent } from './home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MyproductsComponent } from './products/myproducts/myproducts.component';
import { CreateComponent } from './products/create/create.component';
import { UpdateComponent } from './products/update/update.component';
import { DeleteComponent } from './products/delete/delete.component';


import { ComprasComponent } from './compras/compras.component';
import { LandingComponent } from './landing/landing.component';
import { OffersComponent } from './offers/offers.component';


@NgModule({
    declarations: [
        HomeComponent,
        PerfilComponent,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        MyproductsComponent,
        ComprasComponent,
        LandingComponent,
        OffersComponent
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
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedHomeModule
    ]
})
export class PagesHomeModule { }
