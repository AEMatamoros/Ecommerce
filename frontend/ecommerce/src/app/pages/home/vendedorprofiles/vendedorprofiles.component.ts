import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service'
import { ProductsService } from 'src/app/services/products/products.service'

import { Account } from 'src/app/models/account/account'
import {Product} from 'src/app/models/product/product';
import {ProductImages} from 'src/app/models/product/product-images'


@Component({
  selector: 'app-vendedorprofiles',
  templateUrl: './vendedorprofiles.component.html',
  styleUrls: ['./vendedorprofiles.component.css']
})
export class VendedorprofilesComponent implements OnInit {
  constructor(private _Activatedroute:ActivatedRoute,private accountService:AccountService,private productService:ProductsService ) { }
  cuenta_id:string;
  cuentas:Account[];
  products_images:ProductImages[];
  products:Product[];

  ngOnInit(){
    this._Activatedroute.paramMap.subscribe(params => { 
      this.cuenta_id = params.get('id'); 
  });

  this.accountService.getAccounts()
    .subscribe(data =>this.cuentas=data)

  this.productService.getProductsImages()
    .subscribe(data =>this.products_images=data)

  this.productService.getProducts()
    .subscribe(data =>this.products=data)

    return [this.cuentas,this.products_images,this.products]
  }

}
