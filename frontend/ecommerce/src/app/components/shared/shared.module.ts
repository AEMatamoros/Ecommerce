import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Home
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        //home
        NavbarComponent,
        CarouselComponent,
        FooterComponent,
           
    ],
    exports: [
       NavbarComponent,
       CarouselComponent,
       FooterComponent,
    ]
})
export class SharedHomeModule { }
