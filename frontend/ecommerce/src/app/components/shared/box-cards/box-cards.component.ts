import { Component, OnInit } from '@angular/core';
import { ComprasComponent } from '../../../pages/home/compras/compras.component';
import { ShopService } from '../../../services/shop/shop.service';
import { EventEmitterService } from '../../../services/shared/event-emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-box-cards',
  templateUrl: './box-cards.component.html',
  styleUrls: ['./box-cards.component.css']
})
export class BoxCardsComponent implements OnInit {


  public productos;
  public productosImagenes;
  public trueArray = [];
  public busquedaArray = [];
  public encontrados = [];
  public esconderCategorias;

  constructor(private eventEmitterService:EventEmitterService,
              private router:Router,
              private shopService:ShopService
              ) { }

  ngOnInit(): void {

    this.getDatos();
  }

  filtrar(name: string) {
    // this.router.navigate(['/compras']);
    this.eventEmitterService.buscarCategoria(name);
  }

  regresar(){
    this.esconderCategorias = false;
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
    this.esconderCategorias=true;
    console.log(this.encontrados);
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
          // console.log(this.trueArray);
          });
      });

  }

}
