import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductsService } from 'src/app/services/products/products.service'
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product/category';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() product: Product
  @Input() productDetail =  {id:0,name:'', description:'', price:0, category_id:0,user_id:0}

  categories: Category[];

  constructor(private dataService:ProductsService,public router:Router) { }

  ngOnInit() {
    this.productDetail.id= this.product.id
    return this.dataService.getCategory()
      .subscribe(data =>this.categories=data) 
  }

  updateproduct() {
    console.log("Actualizando")
    console.log(this.productDetail)
    this.dataService.putProduct(this.product.id,this.productDetail)
      .subscribe((data: {}) => {
        this.router.navigate(['/my_products'])
      })
  }
}
