import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [
    { id: 1, productId: 1, productName: 'test 1', qty: 4, price: 100},
    { id: 2, productId: 2, productName: 'test 3', qty: 3, price: 50},
    { id: 3, productId: 3, productName: 'test 2', qty: 3, price: 200},
    { id: 4, productId: 4, productName: 'test 4', qty: 2, price: 250},
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