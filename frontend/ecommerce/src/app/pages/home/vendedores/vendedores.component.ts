import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account/account'
import { AccountService } from 'src/app/services/account/account.service'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})
export class VendedoresComponent implements OnInit {
  cuentas:Account[];
  
  constructor(private dataService:AccountService ) { }

  ngOnInit(){
    this.dataService.getAccounts()
    .subscribe(data =>this.cuentas=data)
    //console.log(this.cuentas)
    return this.cuentas
  }

}
