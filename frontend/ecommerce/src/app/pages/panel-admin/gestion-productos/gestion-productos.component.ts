import { Component, OnInit } from '@angular/core';

//Modelos
import { Action, Log } from 'src/app/models/log/log';

//Servicios
import { ProductsService } from 'src/app/services/products/products.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html'
})
export class GestionProductosComponent implements OnInit {
  public id_admin:number;

  public cargado: boolean = false;
  public status:boolean = false;
  public message:string = '';
  
  public products: any;
  public totalProducts: number;
  public desde:number = 1;
 
  constructor(
    private productService: ProductsService,
    private logService: LogService
  ){ 
    this.id_admin = parseInt(localStorage.getItem('id'));
  }

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
            const action = new Action(0, 'CRUD PRODUCT, ACTION: DELETE ');
            this.logService.postAction(action).subscribe(
              resp=>{ 
                const log = new Log('ELIMINO PRODUCTO '+producto.name,this.id_admin, resp['id']);
                this.logService.postLog(log).subscribe(resp=>{console.log(resp)});
              }
            )
            this.obtenerProductos();
          },
          error => {
            console.log(<any>error);
          }
        );
  }

}
