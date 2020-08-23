import { Component, OnInit } from '@angular/core';

//Modelos
import { CartModelServer } from 'src/app/models/cart/cart.model';

//servicios
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  public carritoData: CartModelServer;
  public totalCarrito: number;
  public subtotal: number;

  public cargado: boolean = false;


  constructor(
    public cartService: CartService
  ) { 
    
  }

  ngOnInit(): void {
    this.cartService.dataCarrito$.subscribe(response=>{ this.cargado = true; this.carritoData = response;} );
    this.cartService.totalCarrito$.subscribe(response=>{ this.cargado = true; this.totalCarrito = response} );
  }

  cambiarCantidad(id:number, incrementarCantidad: boolean){
    this.cartService.updateCarrito(id, incrementarCantidad);
  }

}
