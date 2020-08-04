import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service'
import { Account } from 'src/app/models/account/account'

@Component({
  selector: 'app-vendedorprofiles',
  templateUrl: './vendedorprofiles.component.html',
  styleUrls: ['./vendedorprofiles.component.css']
})
export class VendedorprofilesComponent implements OnInit {
  constructor(private _Activatedroute:ActivatedRoute,private dataService:AccountService ) { }
  id:string;
  cuenta:Account[];

  ngOnInit(){
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
  });

  this.dataService.getAccount(this.id)
    .subscribe(data =>this.cuenta=data)
    return this.cuenta
  }

}
