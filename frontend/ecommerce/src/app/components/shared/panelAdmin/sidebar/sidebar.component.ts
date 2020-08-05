import { Component, OnInit } from '@angular/core';

//declare function initPlugins();

//Modelo
import { Account } from 'src/app/models/account/account';

//Servicios
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { UserService } from 'src/app/services/auth/user.service';
import { AccountService } from 'src/app/services/panelAdmin/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public idUser:number;
  public cargando: boolean = true; 
  public data: Account[];

  constructor(
    public _sidebar: SidebarService,
    public auth: UserService,
    private accountService: AccountService
  ) { 
    this.idUser = parseInt(localStorage.getItem('id'));
  }

  ngOnInit(): void {
    //initPlugins();
    this.getAccount();
  }

  getAccount(){
    this.cargando = true;
    this.accountService.obtenerCuenta(this.idUser).subscribe(
      (account)=> { 
        this.data = account;
        this.cargando = false;
        console.log(this.data);
      }
    )
  }

}
