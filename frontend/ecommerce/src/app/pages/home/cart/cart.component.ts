import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModelServer } from 'src/app/models/cart/cart.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  public carritoData: CartModelServer;
  public totalCarrito: number;
  public subtotal: number;

  public productImage: any;
  public cargado: boolean = false;
  public tempData: any;

  constructor(
    public cartService: CartService,
    public productService: ProductsService
  ) { 
    
  }

  ngOnInit(): void {
    this.cartService.dataCarrito$.subscribe(response=>{ this.cargado = true; this.carritoData = response;} );
    this.cartService.totalCarrito$.subscribe(response=>{ this.cargado = true; this.totalCarrito = response} );
    this.getProductImages();
    console.log(this.carritoData);
  }

  getProductImages(){
    this.productService.getProductsImages().subscribe(
      response=>{
        this.cargado = true;
        console.log(response)
        this.productImage = response;
      }
    )
  }

  cambiarCantidad(id:number, incrementarCantidad: boolean){
    this.cartService.updateCarrito(id, incrementarCantidad);
  }

}
