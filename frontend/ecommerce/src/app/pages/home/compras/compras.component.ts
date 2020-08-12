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
  public busquedaArray = [];
  public encontrados = [];

 /*  public producto; */

  constructor( private shopService:ShopService ) {

  }

  ngOnInit(): void {

    this.getDatos();
  }

  buscarProducto( termino:string) {
    termino = termino.toLowerCase();
    this.encontrados = [];
    for (let producto of this.busquedaArray) {
      let prodName = producto.product_id.name.toLowerCase();
      let prodDesc = producto.product_id.description.toLowerCase();
      if (prodName.indexOf(termino) >= 0 || prodDesc.indexOf(termino) >= 0 ) {
        this.encontrados.push(producto);
      }
    }
    console.log(this.encontrados);
    this.trueArray = [];

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
                this.trueArray.push(prodImg);
                break;
              }
            }
          }
          this.busquedaArray = this.trueArray;
          // console.log(this.trueArray);

          });
      });

  }

}
