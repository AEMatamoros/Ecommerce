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
  
  nombre = 'Isaac';
  apellido = 'Magaña';
  imageperfil = 'assets/icons/baner.png';
  imageportada = 'assets/icons/img.png';
  constructor(private dataService:AccountService,public router:Router) { }
  cuentas:Account[]
  cuenta_id=localStorage.getItem('id')
  ngOnInit(){
     this.dataService.getAccounts()
      .subscribe(data =>this.cuentas=data)
    
  }

}
