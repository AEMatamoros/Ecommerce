import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

//rxjs
import { map } from 'rxjs/operators';

//Interfaces
import { Ordenes } from '../../interfaces/ordenes';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  public URL: string;
  public headers: HttpHeaders;
  //ordenes
  public orders:any;
  
  constructor(
    private http: HttpClient
  ) { 
    this.URL = 'http://localhost:8000/api/viewset/'; /*Local*/
    /*this.URL= 'http://52.201.212.27/api/viewset/'; //PRODUCCION */
    this.headers = new HttpHeaders()
    this.headers = this.headers.append('Content-Type','application/json');
    
  }

  getOrdenes(){
    return this.http.get(this.URL+'product_order/', {headers: this.headers})
             .pipe(map((orders: Ordenes)=>this.orders = orders));
  }

  getOrden(id:number){
    this.http.get(this.URL+'order/'+id+'/', {headers: this.headers})
             .pipe(map((order: Ordenes[])=> this.orders = order))
  }


}
