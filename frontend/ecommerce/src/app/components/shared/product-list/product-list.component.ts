import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop/shop.service';

import { Product } from 'src/app/models/product/product';
import { ProductImages } from 'src/app/models/product/product-images';
import { MessengerService } from 'src/app/services/msg/messenger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList = [

  ]

  constructor(private msg: MessengerService) { }

  ngOnInit() {
    this.msg.getMsg().subscribe((detalleProduct: ProductImages) =>{

      //this.addProduct(detalleProduct)
    })
  }

  //addProduct(dellateProduct: ProductImages){
    //this.cartItems.push({
      //productId: product.id,
      //productName: product.name,
      //qty:1,
      //price: product.price
    //})
  //}
}
