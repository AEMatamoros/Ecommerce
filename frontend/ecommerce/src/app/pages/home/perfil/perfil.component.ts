import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/account/account';
import { AccountService } from 'src/app/services/account/account.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  @Input() accountDetail =  {first_name:'', last_name:'', email:'', phone_number:'',id:localStorage.getItem('id'),birth_date:'',password:''}
  constructor(private dataService:AccountService,public router:Router) { }
  cuentas:Account[]
  
  cuenta_id=localStorage.getItem('id')
  ngOnInit(){
     this.dataService.getAccounts()
      .subscribe(data =>this.cuentas=data)
      
    
  }
  imprime(){
    console.log(this.accountDetail)
    //SetPWD
    this.cuentas.forEach(element => {
      if (element.id== parseInt(localStorage.getItem('id'))){
        this.accountDetail.password=element.password;
        this.accountDetail.birth_date=element.birth_date.toString()
      }
    });
    //FormatDate
    this.dataService.putAccount(localStorage.getItem('id'),this.accountDetail)
    .subscribe(data => this.accountDetail)
    console.log("Actualizado")
  }
}
