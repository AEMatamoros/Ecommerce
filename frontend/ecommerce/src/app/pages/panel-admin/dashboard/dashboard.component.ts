import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirigir(tipo: string){
    if(tipo == 'p'){
      this.router.navigateByUrl('admin/productos');
    }else if(tipo == 'o'){
      this.router.navigateByUrl('admin/ordenes');
    }else if(tipo=='u'){
      this.router.navigateByUrl('admin/cuentas');
    }

    
  }

}
