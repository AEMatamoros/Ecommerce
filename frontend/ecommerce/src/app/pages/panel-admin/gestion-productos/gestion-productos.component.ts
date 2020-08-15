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
  public totalProducts: number;
  public desde:number = 1;
 
  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productService.getProductsImagesPages(this.desde).subscribe(
      resp => {
        this.cargado = true;
        this.products = resp['results'];
        this.totalProducts = resp['count'];
        //console.log(resp);
      },
      error => console.log(<any>error)
    )
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    let paginas = Math.round(this.totalProducts / 9);
    
    if ( this.desde < 0 ) {
      this.desde = 1;
    } else if ( this.desde >= paginas ) {
      this.desde -= paginas;
    }
    
    this.obtenerProductos();
    
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
