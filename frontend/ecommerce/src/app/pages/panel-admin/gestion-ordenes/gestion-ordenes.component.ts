import { Component, OnInit } from '@angular/core';

//Interfaces
import { Ordenes } from 'src/app/interfaces/ordenes';

//Servicios
import { OrdenesService } from 'src/app/services/panelAdmin/ordenes.service';

@Component({
  selector: 'app-gestion-ordenes',
  templateUrl: './gestion-ordenes.component.html',
  styleUrls: ['./gestion-ordenes.component.css']
})
export class GestionOrdenesComponent implements OnInit {
  public cargado:boolean;
  public orders: any;
  public status: string = '';
  public message: string;

  constructor(
    private orderService: OrdenesService
  ) { }

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(){
    this.orderService.getOrdenes().subscribe(
      resp=>{
        this.cargado = true;
        this.orders = resp['results'];
      }
    )
  }

  deleteOrder(order: any){
    this.orderService.deleteProductOrden(order.id)
        .subscribe(resp=>{
          this.status = 'success';
          this.message = 'Orden eliminada correctamente!';
          this.ngOnInit();
        },
        err=> console.log(<any>err))
  }

}
