import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop/shop.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  public productos;
  public productosImagenes;

 /*  public producto; */

  constructor( private shopService:ShopService ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductsImage();
  }

  ngAfterViewInit() {

  }

  getProducts() {
    this.shopService.getProducts()
      .subscribe(data => {
        this.productos = data;
        console.log(this.productos[0]);
      });
    }

  getProductsImage() {
    this.shopService.getProductsImage()
      .subscribe(data => {
        this.productosImagenes = data;
        console.log(this.productosImagenes);
        /* for (let key in this.productosImagenes) {
          let mealName = this.productos[key];
          console.log(mealName);
        } */

      });
    }



    /* for (let key of Object.keys(productos)) {
      let mealName = this.productos[key];
      // ... do something with mealName
      console.log(mealName);
    } */

}
