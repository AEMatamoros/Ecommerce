import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModelServer } from 'src/app/models/cart/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  public carritoData: CartModelServer;
  public totalCarrito: number;
  public subtotal: number;

  prueba:boolean = true;

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.dataCarrito$.subscribe(response=> this.carritoData = response);
    this.cartService.totalCarrito$.subscribe(response=> this.totalCarrito = response);
  }

}
