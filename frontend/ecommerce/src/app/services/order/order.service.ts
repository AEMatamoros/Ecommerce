import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//Modelos
import { Status} from 'src/app/models/order/order';
import { Order} from 'src/app/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  API_Url_Status='http://52.201.212.27/api/viewset/status/'
  API_Url_Order='http://52.201.212.27/api/viewset/order/'

  //Status
  getStatus(){
    return this.http.get<Status[]>(this.API_Url_Status)
  }

  postStatus(Status){
    return this.http.post<Status[]>(this.API_Url_Status, JSON.stringify(Status),this.httpOptions)
  }

  putStatus(id,Status){
    return this.http.put<Status[]>(this.API_Url_Status+''+id+'/', JSON.stringify(Status),this.httpOptions)
  }

  deleteStatus(id){
    return this.http.delete<Status[]>(this.API_Url_Status+''+id+'/',this.httpOptions)
  }
  //Order
  getOrder(){
    return this.http.get<Order[]>(this.API_Url_Order)
  }

  postOrder(Status){
    return this.http.post<Order[]>(this.API_Url_Order, JSON.stringify(Order),this.httpOptions)
  }

  putOrder(id,Status){
    return this.http.put<Order[]>(this.API_Url_Order+''+id+'/', JSON.stringify(Order),this.httpOptions)
  }

  deleteOrder(id){
    return this.http.delete<Order[]>(this.API_Url_Order+''+id+'/',this.httpOptions)
  }
}
