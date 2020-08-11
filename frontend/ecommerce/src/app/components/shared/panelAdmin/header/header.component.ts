import { Component, OnInit } from '@angular/core';

//Modelos
import { Account } from 'src/app/models/account/account';

//Servicios
import { AccountService } from 'src/app/services/panelAdmin/account.service';
import { UserService } from 'src/app/services/auth/user.service';
import { Router } from '@angular/router';

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
    private accountService: AccountService,
    private auth: UserService,
    private router: Router
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

  logout(){
    this.auth.logoutUser();
  }

}
