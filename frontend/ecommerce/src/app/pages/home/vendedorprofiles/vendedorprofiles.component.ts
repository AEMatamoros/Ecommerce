import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service'
import { ProductsService } from 'src/app/services/products/products.service'
import { GeneralService} from 'src/app/services/general/general.service'
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account/account'
import {Product} from 'src/app/models/product/product';
import {ProductImages} from 'src/app/models/product/product-images'


@Component({
  selector: 'app-vendedorprofiles',
  templateUrl: './vendedorprofiles.component.html',
  styleUrls: ['./vendedorprofiles.component.css']
})
export class VendedorprofilesComponent implements OnInit {
  constructor(private _Activatedroute:ActivatedRoute,private accountService:AccountService,private productService:ProductsService,private complaintService:GeneralService,public router:Router) { }
  @Input() complaint =  {problem:'', comment:'', accuser_user_id:localStorage.getItem('id'), denounced_user_id:0}
  
  cuenta_id:string;
  cuenta:any;
  products_images:ProductImages[];
  products:Product[];
  done:boolean

  ngOnInit(){
    this._Activatedroute.paramMap.subscribe(params => { 
      this.cuenta_id = params.get('id'); 
    this.complaint.denounced_user_id= parseInt(this.cuenta_id) 
    console.log(this.complaint)
    this.done=false;
  });

  this.accountService.getAccount(this.cuenta_id)
    .subscribe(data =>this.cuenta=data)

  this.productService.getProductsImages()
    .subscribe(data =>this.products_images=data)

  this.productService.getProducts()
    .subscribe(data =>this.products=data)
  
    return [this.cuenta,this.products_images,this.products]
  }

  report(){
    
    this.complaintService.postComplaints(this.complaint)
      .subscribe((data: {}) => {
        this.router.navigate(['/vendedores'])
      })
      this.done=false;
  }
    
  }


