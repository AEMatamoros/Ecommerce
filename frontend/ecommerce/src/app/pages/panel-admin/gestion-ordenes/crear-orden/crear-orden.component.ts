import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

//Modelos
import { Status } from 'src/app/models/general/general-models';
import { Product } from 'src/app/models/product/product';
import { Account } from 'src/app/models/account/account';
import { Direccion } from 'src/app/interfaces/direccion';
import { AdminOrder } from 'src/app/models/order/AdminOrder';
import { ProductOrder } from 'src/app/models/order/productOrder';
import { Action, Log } from 'src/app/models/log/log';
//Servicios
import { OrdenesService } from 'src/app/services/panelAdmin/ordenes.service';
import { LogService } from 'src/app/services/log/log.service';


@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html'
})
export class CrearOrdenComponent implements OnInit {
  public id_admin: number;  

  public status:string;
  public message:string;
  public cargado:boolean = false;

  public statusOrder: Status[];
  public totalStatus: number;

  public directionsOrder: Direccion[];
  public totalDirections: number;

  public productos: Product[];
  public totalProductos: number;

  public usuarios: Account[];
  public totalUsuarios: number;

  public order = {
    product_id: 0,
    quantity: 0,
    status: 0,
    direction: 0,
    total: 0
  }

  constructor(
    private router: Router,
    private orderService: OrdenesService,
    private logService: LogService
  ) {
    this.id_admin = parseInt(localStorage.getItem('id'));
  }

  ngOnInit(): void {
    this.obtenerStatus();
    this.obtenerProducts();
    this.obtenerDirections();
  }

  cargarOrden(id:number){
    if(id == undefined){
      return false;
    }
    
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

  obtenerDirections(){
    this.orderService.getDirections().subscribe(
      ({total, directions})=>{
        this.totalDirections = total;
        this.directionsOrder = directions;
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
        console.log(this.productos);
      }
    )
  }

  onFormOrder(OrderForm: NgForm){
   
    if(OrderForm.valid){
      let product_id = OrderForm.form.value.producto;
      var total = OrderForm.form.value.total;
      var subtotal = 0;
      let quantity = OrderForm.value.quantity;
      let status_id = OrderForm.value.status;
      let direction = OrderForm.value.direction;

      for(let product of this.productos){
        if(product_id == product.id){
          subtotal = product.price * quantity;
          total = (subtotal*1.15).toFixed(2);  //ISV(15%) - REDONDEO A 2 DECIMALES
        }
      }
      const order = new AdminOrder(0, subtotal, quantity, 15, total, parseInt(status_id), parseInt(direction));
     
      //ADD ORDER
      this.orderService.addOrden(order).subscribe(
        resp=>{
          const order_id = resp['id'];
          const product_order = new ProductOrder(0, product_id, order_id);
          this.orderService.addProductOrden(product_order).subscribe(
            resp=> {
              this.status = 'success';
              this.message = 'Orden agregada EXITOSAMENTE!';
              const action = new Action(0, 'CRUD ORDER, ACTION: AGREGAR');
              
              this.logService.postAction(action).subscribe(
                resp=>{ 
                  const log = new Log('CREACION DE ORDEN DE PRODUCTO',this.id_admin, resp['id']);
                  this.logService.postLog(log).subscribe(resp=>{console.log(resp)});
                }
              )
              this.router.navigateByUrl('admin/ordenes');
            }
          )
        },
        error=>{ console.log(<any> error);}
      );
    }
  }
}
