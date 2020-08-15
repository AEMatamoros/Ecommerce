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
  cuenta_id:number
  //Modelo
  products:Product[];
  products_images:ProductImages[];

  
  //Llamar al servicio
  constructor(private dataService:ProductsService ) { }

  ngOnInit(){
    this.dataService.getAllProducts()
    .subscribe(data =>this.products=data)
    var product_images=this.dataService.getAllProductsImages()
    .subscribe(data =>this.products_images=data)
    this.cuenta_id= parseInt(localStorage.getItem('id')) 
    return [this.products,this.products_images]
  }

}