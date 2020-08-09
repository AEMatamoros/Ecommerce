import { Component, OnInit } from '@angular/core';

//Modelos
import { Account } from 'src/app/models/account/account';

//Servicios
import { AccountService } from 'src/app/services/panelAdmin/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public idUser:number;
  public cargando: boolean = true;
  public dataAccount: Account[];

  constructor(
    private accountService: AccountService
  ){ 
    this.idUser = parseInt(localStorage.getItem('id'));
  }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(){
    this.cargando = true;
    this.accountService.obtenerCuenta(this.idUser).subscribe(
      (account)=> { 
        this.dataAccount = account;
        this.cargando = false;
        //console.log(this.dataAccount);
      }
    )
    
  }

}
