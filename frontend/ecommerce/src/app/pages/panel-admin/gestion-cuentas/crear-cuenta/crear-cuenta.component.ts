import { Component, OnInit } from '@angular/core';

//Servicios
import { AccountService } from '../../../../services/panelAdmin/account.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
   
  }

}
