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
  public category;
  public trueArray = [];
  public busquedaArray = [];
  public encontrados = [];

  public categoria1;
  public categoria2;
  public categoria3;
  public categoria4;

 /*  public producto; */

  constructor( private shopService:ShopService ) {

  }

  ngOnInit(): void {

    this.getDatos();
  }

  buscarProducto( termino: string ) {
    termino = termino.toLowerCase();
    this.encontrados = [];
    for (let producto of this.busquedaArray) {
      let prodName = producto.product_id.name.toLowerCase();
      let prodDesc = producto.product_id.description.toLowerCase();
      let categoria = producto.product_id.category_id.category_name.toLowerCase();
      // console.log('holass ',termino,categoria);
      if (prodName.indexOf(termino) >= 0 || prodDesc.indexOf(termino) >= 0 || categoria === termino ) {
        this.encontrados.push(producto);
      }
    }
    console.log(this.encontrados);
    this.trueArray = [];
  }


  getDatos() {
    this.shopService.getProducts()
      .subscribe(data => {
        this.productos = data;
        // console.log(this.productos);

        this.shopService.getProductsImage()
          .subscribe(data => {
          this.productosImagenes = data;
           console.log(this.productosImagenes);
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

          this.shopService.getCategory()
            .subscribe(data => {
            this.category = data['results'];
            // console.log(this.category);
            this.categoria1 = this.category[0].category_name;
            this.categoria2 = this.category[1].category_name;
            this.categoria3 = this.category[2].category_name;
            this.categoria4 = this.category[3].category_name;
            });

          });
      });

  }

}
