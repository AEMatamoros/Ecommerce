import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { CartModelServer } from 'src/app/models/cart/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cargado:boolean = false;

  public totalPagar: number;
  public carritoData: CartModelServer;
  
  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.dataCarrito$.subscribe(response=>{ this.cargado = true; this.carritoData = response;} );
    this.cartService.totalCarrito$.subscribe(response=>{ this.cargado = true; this.totalPagar = response} );
  }

}
