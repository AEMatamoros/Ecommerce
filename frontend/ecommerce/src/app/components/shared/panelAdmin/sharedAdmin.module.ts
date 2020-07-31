import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Admin
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        //home
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
            
    ],
    exports: [
       HeaderComponent,
       SidebarComponent,
       BreadcrumbsComponent
    ]
})
export class SharedAdminModule { }
