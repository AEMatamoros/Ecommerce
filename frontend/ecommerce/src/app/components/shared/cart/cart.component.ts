import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  /* Estatico por el momento */
  cartItems = [
    { id: 1, productId: 1, productName: 'test 1', qty: 5, price: 100},
    { id: 2, productId: 2, productName: 'test 2', qty: 2, price: 50},
    { id: 3, productId: 3, productName: 'test 3', qty: 2, price: 200},
    { id: 4, productId: 4, productName: 'test 4', qty: 1, price: 250},
    { id: 5, productId: 5, productName: 'test 5', qty: 3, price: 250},
  ]

  cartTotal = 0

  constructor() { }

  ngOnInit() {
    
  }

  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

}