import { RouterModule, Routes } from '@angular/router';

/*Protección de rutas*/ 
import { AuthGuard } from '../../guards/auth.guard';

//Pages
import { PerfilComponent } from './perfil/perfil.component';
import { MyproductsComponent } from './products/myproducts/myproducts.component';
import { ComprasComponent } from './compras/compras.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';


const pagesHomeRoutes: Routes = [
    {
        path: 'perfil',
        component: PerfilComponent, 
        canActivate: [ AuthGuard ]
    },
    {
        path: 'compras',
        component: ComprasComponent,
        children: [
            {path: 'detalle', component: DetalleProductoComponent}
        ]
    },
    {
        path: 'misProductos',
        component: MyproductsComponent,
        canActivate: [AuthGuard]
    },   
    
];

export const PAGES_HOME_ROUTES = RouterModule.forChild( pagesHomeRoutes );