import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: 'datos' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
         { titulo: 'Cuentas', url: 'cuentas' },
         { titulo: 'Productos', url: 'productos' },
         {titulo: 'Ordenes', url:'ordenes' }
      ]
    }
  ];
  
  constructor() { }
}
