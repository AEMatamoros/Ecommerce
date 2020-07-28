import { Component, OnInit, Input } from '@angular/core';


import { ProductsService } from 'src/app/services/products/products.service'
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product/category';
import { Currency } from 'src/app/models/product/currency';
 
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(private dataService:ProductsService,public router:Router) { }

  //PostProductInputForm
  @Input() productDetail =  {name:'', description:'', price:0, category_id:0,user_id:0}
  //Objetos
  categories:Category[];
  currencies:Currency[];
  

  ngOnInit(){
    return this.dataService.getCategories()
      .subscribe(data =>this.categories=data) 
  }

  addproduct() {
    console.log("Creando")
    this.dataService.postProduct(this.productDetail)
      .subscribe((data: {}) => {
        this.router.navigate(['/my_products'])
      })
  }
}
