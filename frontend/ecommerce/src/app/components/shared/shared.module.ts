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
        FooterComponent
           
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
