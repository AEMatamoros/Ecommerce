import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//servicios
import { ProductsService } from 'src/app/services/products/products.service';
import { AccountService } from 'src/app/services/panelAdmin/account.service';
import { OrdenesService } from 'src/app/services/panelAdmin/ordenes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public cargado: boolean = false;
  public products: any;
  public totalProductos: number;
  public usuarios: any;
  public totalUsuarios: number;
  public ordenes: any;
  public totalOrdenes: number;
  
  constructor(
    private productServices: ProductsService,
    private accountServices: AccountService,
    private ordenesServices: OrdenesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerUsuarios();
    this.obtenerOrdenes();
  }

  obtenerProductos(){
    this.productServices.getProductsImages().subscribe(
      resp=> { 
        this.cargado = true;
        this.products = resp['results']; 
        this.totalProductos = resp['count'];
        console.log(this.products);
      }
    )
  }

  obtenerUsuarios(){
    this.accountServices.obtenerCuentas().subscribe(
      resp=>{
        this.usuarios = resp['results'];
        this.totalUsuarios = resp['count'];
        this.cargado = true;
        console.log(this.usuarios);
      }
    )
  }

  obtenerOrdenes(){
    this.ordenesServices.getOrdenes().subscribe(
      resp=>{
        this.ordenes = resp['results'];
        this.totalOrdenes = resp['count'];
        this.cargado = true;
        console.log(this.ordenes);
      }
    )
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
