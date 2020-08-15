import { Component, OnInit } from '@angular/core';

//Modelos
import { Status } from 'src/app/models/general/general-models';
import { Product } from 'src/app/models/product/product';
import { Account } from 'src/app/models/account/account';

//Servicios
import { OrdenesService } from 'src/app/services/panelAdmin/ordenes.service';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html'
})
export class CrearOrdenComponent implements OnInit {
  public status:string;
  public message:string;
  public cargado:boolean = false;

  public statusOrder: Status[];
  public totalStatus: number;
  public productos: Product[];
  public totalProductos: number;
  public usuarios: Account[];
  public totalUsuarios: number;

  constructor(
    
    private orderService: OrdenesService
    
  ) {
    
  }

  ngOnInit(): void {
    this.obtenerStatus();
    this.obtenerProducts();
    this.obtenerUsuarios();
  }

  
  obtenerStatus(){
    this.orderService.getStatus().subscribe(
      ({total, status})=>{
        this.totalStatus = total;
        this.statusOrder = status;
        this.cargado = true;
      }
    )
  }

  obtenerProducts(){
    this.orderService.getProducts().subscribe(
      ({total, products})=>{
        this.cargado = true;
        this.totalProductos = total;
        this.productos = products;
        
        //console.log(this.productos);
      }
    )
  }

  obtenerUsuarios(){
    this.orderService.getUsuarios().subscribe(
      ({total, accounts})=>{
        this.totalUsuarios = total;
        this.usuarios = accounts;
        this.cargado = true;
      }
    )
  }


  onFormOrder(){
    
  }
}
