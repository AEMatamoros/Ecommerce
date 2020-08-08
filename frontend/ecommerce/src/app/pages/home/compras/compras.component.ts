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
  public trueArray = [];

 /*  public producto; */

  constructor( private shopService:ShopService ) {

  }

  ngOnInit(): void {
    /* this.getProducts();
    this.getProductsImage(); */
    this.getDatos();
  }


  ngAfterViewInit() {

  }

  getDatos() {
    this.shopService.getProducts()
      .subscribe(data => {
        this.productos = data;
        // console.log(this.productos);

        this.shopService.getProductsImage()
          .subscribe(data => {
          this.productosImagenes = data;
          // console.log(this.productosImagenes);
          for (let prod of this.productos ) {
            for (let prodImg of this.productosImagenes) {
              if (prodImg.product_id.id === prod.id) {
                this.trueArray.push([prod, prodImg]);
                break;
              }
            }
          }
          // console.log(this.trueArray);

          });
      });

  }

}
