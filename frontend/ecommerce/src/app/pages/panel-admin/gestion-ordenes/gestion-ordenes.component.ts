import { Component, OnInit } from '@angular/core';

//Modelos
import { Action, Log } from 'src/app/models/log/log';

//Servicios
import { OrdenesService } from 'src/app/services/panelAdmin/ordenes.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-gestion-ordenes',
  templateUrl: './gestion-ordenes.component.html',
  styleUrls: ['./gestion-ordenes.component.css']
})
export class GestionOrdenesComponent implements OnInit {

  public id_admin:number;

  public cargado:boolean;
  public orders: any;
  public status: string = '';
  public message: string;

  constructor(
    private orderService: OrdenesService,
    private logService: LogService
  ) { 
    this.id_admin = parseInt(localStorage.getItem('id'));
  }

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
          const action = new Action(0, 'CRUD ORDER, ACTION: DELETE ');
          this.logService.postAction(action).subscribe(
            resp=>{ 
              const log = new Log('ELIMINO ORDEN DE PRODUCTO ',this.id_admin, resp['id']);
              this.logService.postLog(log).subscribe(resp=>{console.log(resp)});
            }
          )
          this.ngOnInit();
        },
        err=> console.log(<any>err))
  }

}
