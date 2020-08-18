import { Component, OnInit } from '@angular/core';

//Modelos
import { Account } from 'src/app/models/account/account';
import { Image } from 'src/app/models/general/general-models';
import { Action, Log } from 'src/app/models/log/log';

//Servicio
import { AccountService } from 'src/app/services/panelAdmin/account.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-gestion-cuentas',
  templateUrl: './gestion-cuentas.component.html'
})
export class GestionCuentasComponent implements OnInit {
  public id_admin:number;

  public cuentas: Account[] = [];
  public image: Image[] = [];

  public desde: number = 1;
  public status: boolean = false;
  public message: string = '';

  public txtTermino: any = 0;
  public totalCuentas: number = 0;

  constructor(
    public accountService: AccountService,
    private logService: LogService
  ) {
    this.id_admin = parseInt(localStorage.getItem('id')); 
  }

  ngOnInit(): void {
    this.obtenerCuentasPaginadas();
  }

  borrarCuenta(cuenta: Account){
    this.accountService.borrarCuenta(cuenta.id)
              .subscribe(response => {
                this.status = true;
                this.message = 'Cuenta borrada exitosamente!';
                const action = new Action(0, 'CRUD ACCOUNT, ACTION: DELETE ');
                this.logService.postAction(action).subscribe(
                  resp=>{ 
                    const log = new Log('ELIMINO CUENTA DE USUARIO '+cuenta.email,this.id_admin, resp['id']);
                    this.logService.postLog(log).subscribe(resp=>{console.log(resp)});
                  }
                )
                this.obtenerCuentasPaginadas();
                //console.log(response);
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
