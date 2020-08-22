import { Component, OnInit } from '@angular/core';

import { ShopService } from '../../../services/shop/shop.service';
import { CartService } from 'src/app/services/cart.service';
import { EventEmitterService } from 'src/app/services/shared/event-emitter.service';

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
  public terminoCategoria;

  public categoria1;
  public categoria2;
  public categoria3;
  public categoria4;
  public categoria5;

 /*  public producto; */

  constructor( 
    private cartService:CartService,
    private shopService: ShopService,
    private eventEmitterService:EventEmitterService
  ){}

  ngOnInit(): void {

    this.getDatos();

    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeFirstComponentFunction.subscribe((name: string) => {
        this.terminoCategoria = false;
        this.buscarProducto(name);
      });
    }
  }

  addCarrito(product_id: number){
    console.log('AGREGANDO AL CARRITO SERVICES', product_id);
    this.cartService.addProductCarrito(product_id);
  }

  
  buscarProducto( termino: string ) {
    termino = termino.toLowerCase();
    this.encontrados = [];
    for (let producto of this.busquedaArray) {
      let prodName = producto.product_id.name.toLowerCase();
      let prodDesc = producto.product_id.description.toLowerCase();
      let categoria = producto.product_id.category_id.category_name.toLowerCase();
  
      if (prodName.indexOf(termino) >= 0 || prodDesc.indexOf(termino) >= 0 || categoria === termino ) {
        this.encontrados.push(producto);
      }
    }
    this.trueArray = [];
  }


  getDatos() {
    this.shopService.getProducts()
      .subscribe(data => {
        this.productos = data;
        
        this.shopService.getProductsImage()
          .subscribe(data => {
          this.productosImagenes = data;
    
          for (let prod of this.productos ) {
            for (let prodImg of this.productosImagenes) {
              if (prodImg.product_id.id === prod.id) {
                this.trueArray.push(prodImg);
                break;
              }
            }
          }
          this.busquedaArray = this.trueArray;
          
          this.shopService.getCategory()
            .subscribe(data => {
            this.category = data['results'];
            this.categoria1 = this.category[0].category_name;
            this.categoria2 = this.category[1].category_name;
            this.categoria3 = this.category[2].category_name;
            this.categoria4 = this.category[3].category_name;
            this.categoria5 = this.category[4].category_name;
            });

          });
      });

  }

}
