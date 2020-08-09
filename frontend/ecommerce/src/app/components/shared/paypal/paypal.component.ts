import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement : ElementRef;
  
  producto = {
    description : 'producto en venta',
    precio      :  500.99,
    img         :  'imagen del producto'
  }
  title = 'angular-paypal-payment';


  ngOnInit(){

    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.description,
              amount     :{
                currency_code: 'USD',
                value        : this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture()
        console.log(order);
      },
      onError: err =>{
        console.log(err);
      }
    })
    .render( this.paypalElement.nativeElement);
  }

}