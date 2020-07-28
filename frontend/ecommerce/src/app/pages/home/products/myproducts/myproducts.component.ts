import { Component, OnInit,Input } from '@angular/core';
import {Product} from 'src/app/models/product/product';
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

  
  //Llamar al servicio
  constructor(private dataService:ProductsService ) { }

  ngOnInit(){
    return this.dataService.getProducts()
      .subscribe(data =>this.products=data) 
  }

}