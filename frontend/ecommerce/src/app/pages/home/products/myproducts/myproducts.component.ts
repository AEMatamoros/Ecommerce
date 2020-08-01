import { Component, OnInit,Input } from '@angular/core';
import {Product} from 'src/app/models/product/product';
import {ProductImages} from 'src/app/models/product/product-images'
import { ProductsService } from 'src/app/services/products/products.service'

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})

export class MyproductsComponent implements OnInit {
  
  imagen_producto = 'assets/img/example.jpg';
  
  //Modelo
  products:Product[];
  products_images:ProductImages[];

  
  //Llamar al servicio
  constructor(private dataService:ProductsService ) { }

  ngOnInit(){
    this.dataService.getProducts()
    .subscribe(data =>this.products=data)
    var product_images=this.dataService.getProductsImages()
    .subscribe(data =>this.products_images=data)
    return [this.products,this.products_images]
  }

}