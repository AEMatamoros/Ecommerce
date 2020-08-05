import { Component, OnInit } from '@angular/core';

//Modelos
import { Account } from 'src/app/models/account/account';
import { Image } from 'src/app/models/general/general-models';

//Servicio
import { AccountService } from 'src/app/services/panelAdmin/account.service';

@Component({
  selector: 'app-gestion-cuentas',
  templateUrl: './gestion-cuentas.component.html',
  styleUrls: ['./gestion-cuentas.component.css']
})
export class GestionCuentasComponent implements OnInit {
  public cuentas: Account[] = [];
  public image: Image[] = [];
  public desde: number = 1;
  public siguiente: string;
  public anterior: string;
  public txtTermino: any = 0;
  public totalCuentas: number = 0;

  constructor(
    public accountService: AccountService
  ) {
    
    
  }

  ngOnInit(): void {
    this.obtenerCuentasPaginadas();
  }

  obtenerCuentas(){
    this.accountService.obtenerCuentas().subscribe(response => this.cuentas = response);
  }

  obtenerCuentasPaginadas(){
    this.accountService.obtenerCuentasPaginadas(this.desde)
                       .subscribe(({total, cuentas, next, previous})=>{
                         this.totalCuentas = total;
                         this.cuentas = cuentas;
                         this.siguiente = next;
                         this.anterior = previous;
                         //console.log(this.cuentas);
                       });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;
    
    if ( this.desde < 0 ) {
      this.desde = 1;
    } else if ( this.desde >= this.totalCuentas ) {
      this.desde -= valor; 
    }

    this.obtenerCuentasPaginadas();
  }

  

  
}
