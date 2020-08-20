import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor() { }

  sendMsg(product){
    this.subject.next(product)
  }

  getMsg(){
    return this.subject.asObservable()
  }




  sendProduct(productImage){
    console.log(productImage)
    this.subject.next(productImage)

  }

  getProduct(){
    return this.subject.asObservable()
  }
}
