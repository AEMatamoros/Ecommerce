import { Component, OnInit } from '@angular/core';

//Servicios
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html'
})
export class GestionProductosComponent implements OnInit {
  public cargado: boolean = false;
  public status:boolean = false;
  public message:string = '';
  public products: any;
 
  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productService.getProductsImages().subscribe(
      resp => {
        this.cargado = true;
        this.products = resp;
        console.log(resp);
      },
      error => console.log(<any>error)
    )
  }

  borrarProducto(producto: any){
    this.productService.deleteProductImages(producto.id)
        .subscribe(
          resp=> {
            this.status = true;
            this.message = 'Producto borrado exitosamente!';
            this.obtenerProductos();
          },
          error => {
            console.log(<any>error);
          }
        );
  }

}
