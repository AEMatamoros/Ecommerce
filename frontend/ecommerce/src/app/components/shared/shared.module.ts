import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Home
import { NavbarComponent } from './navbar/navbar.component';
import { BoxCardsComponent } from './box-cards/box-cards.component';
import { CardsComponent } from './cards/cards.component';
import { CorouselCardsComponent } from './corousel-cards/corousel-cards.component';
import { CorouselImgComponent } from './corousel-img/corousel-img.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { FiltersComponent } from './filters/filters.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        //home
        NavbarComponent,
        BoxCardsComponent,
        CardsComponent,
        CorouselCardsComponent,
        CorouselImgComponent,     
        FooterComponent, ProductListComponent, ProductItemComponent, CartComponent, CartItemComponent, FiltersComponent, BannerComponent
           
    ],
    exports: [
        NavbarComponent,
        BoxCardsComponent,
        CardsComponent,
        CorouselCardsComponent,
        CorouselImgComponent, 
        FooterComponent
    ]
})
export class SharedHomeModule { }
