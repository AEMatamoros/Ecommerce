import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgModel, NgControl } from '@angular/forms';


//Modulo
import { SharedHomeModule } from '../../components/shared/shared.module';

//Componentes
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';

import { PerfilComponent } from './perfil/perfil.component';

import { MyproductsComponent } from './products/myproducts/myproducts.component';
import { CreateComponent } from './products/create/create.component';
import { UpdateComponent } from './products/update/update.component';
import { DeleteComponent } from './products/delete/delete.component';


import { ComprasComponent } from './compras/compras.component';

import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

import { OffersComponent } from './offers/offers.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import { VendedoresComponent } from './vendedores/vendedores.component';
import { VendedorprofilesComponent } from './vendedorprofiles/vendedorprofiles.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

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
        OffersComponent,
        VendedoresComponent,
        VendedorprofilesComponent,
        DetalleProductoComponent,
        ShoppingCartComponent,
        CartComponent,
        CheckoutComponent
    ],
    exports: [
        PerfilComponent,
        MyproductsComponent,
        CreateComponent,
        UpdateComponent,
        DeleteComponent,
        ComprasComponent,
        DetalleProductoComponent
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
