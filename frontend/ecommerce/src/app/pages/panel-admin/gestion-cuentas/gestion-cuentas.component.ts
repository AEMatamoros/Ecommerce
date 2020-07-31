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
  public cuenta: any;

  constructor(
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.obtenerCuentas();
    this.obtenerImagenUser();
    
  }

  obtenerCuentas(){
    this.accountService.obtenerCuentas().subscribe((cuentas: Account[])=>{
      this.cuentas = cuentas;
      console.log(this.cuentas);
    });
  }

  obtenerImagenUser(){

    this.accountService.obtenerImagen().subscribe((image: Image[])=>{
      this.image = image;
      console.log(this.image);
    })
  }


}
