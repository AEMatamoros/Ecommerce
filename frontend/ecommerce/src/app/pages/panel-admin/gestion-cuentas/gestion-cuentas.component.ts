import { Component, OnInit } from '@angular/core';

//Modelos
import { Account } from 'src/app/models/account/account';
import { Image } from 'src/app/models/general/general-models';

//Servicio
import { AccountService } from 'src/app/services/panelAdmin/account.service';

@Component({
  selector: 'app-gestion-cuentas',
  templateUrl: './gestion-cuentas.component.html'
})
export class GestionCuentasComponent implements OnInit {
  public cuentas: Account[] = [];
  public image: Image[] = [];
  public desde: number = 1;
  public status: boolean = false;
  public message: string = '';
  public txtTermino: any = 0;
  public totalCuentas: number = 0;

  constructor(
    public accountService: AccountService
  ) {
    
    
  }

  ngOnInit(): void {
    this.obtenerCuentasPaginadas();
  }

  borrarCuenta(cuenta: Account){
    this.accountService.borrarCuenta(cuenta.id)
              .subscribe(response => {
                this.obtenerCuentasPaginadas();
                this.status = true;
                this.message = 'Cuenta borrada exitosamente!'
                console.log(response);
              },
                error => {
                console.log(error);
                this.message = error;
              })
  }

  obtenerCuentas(){
    this.accountService.obtenerCuentas().subscribe(response => this.cuentas = response);
  }

  obtenerCuentasPaginadas(){
    this.accountService.obtenerCuentasPaginadas(this.desde)
                       .subscribe(({total, cuentas})=>{
                         this.totalCuentas = total;
                         this.cuentas = cuentas;
                         //console.log(this.cuentas);
                       });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;
    let paginas = Math.round(this.totalCuentas / 9);
  
    if ( this.desde < 0 ) {
      this.desde = 1;
    } else if ( this.desde >= paginas ) {
      this.desde -= paginas; 
    }

    this.obtenerCuentasPaginadas();
  }

}
