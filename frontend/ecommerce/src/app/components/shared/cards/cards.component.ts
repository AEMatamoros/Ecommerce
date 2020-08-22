import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop/shop.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  public productos;
  public productosImagenes;
  public productosCarrusel = [];
  public c = 1;


  constructor( private shopService:ShopService ) { }

  ngOnInit(): void {
    this.getDatos();
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
          while (this.c <= 8 ) {
            // console.log('hola beibe', this.c);
            // console.log(this.productos[this.c].id);
            for (let prodImg of this.productosImagenes) {
              if (prodImg.product_id.id === this.productos[this.c].id) {
                this.productosCarrusel.push(prodImg);
                break;
              }
            }
            this.c += 1;
          }
          // console.log(this.productosCarrusel);

          });
      });

  }


}
