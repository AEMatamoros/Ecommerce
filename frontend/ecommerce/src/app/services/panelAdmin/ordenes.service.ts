import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

//rxjs
import { map } from 'rxjs/operators';

//Interfaces
import { Ordenes } from '../../interfaces/ordenes';
import { CargarStatus } from 'src/app/interfaces/cargar-status';
import { CargarProductos } from 'src/app/interfaces/cargar-product';
import { CargarCuentas } from 'src/app/interfaces/cargar-cuentas';

//Modelos
import { Status } from 'src/app/models/general/general-models';
import { Product } from 'src/app/models/product/product';
import { Account } from 'src/app/models/account/account';
import { Order } from 'src/app/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  public URL: string;
  public headers: HttpHeaders;
  //ordenes
  public orders:Ordenes[];
  public status: CargarStatus[];
  public products: CargarProductos[];
  
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
             .pipe(map((orders: Ordenes[])=>this.orders = orders));
  }

  getOrden(id:number){
    return this.http.get(this.URL+'order/'+id+'/', {headers: this.headers})
             .pipe(map((order: Ordenes[])=> this.orders = order));
  }

  getStatus(){
    return this.http.get<CargarStatus>(this.URL+'status/', {headers: this.headers})
             .pipe(
               map(resp=>{
                 const status = resp.results.map(
                   estado => new Status(estado.id, estado.description)
                 );
                 return {
                   total: resp.count,
                   next: resp.next,
                   previous: resp.previous,
                   status
                 }
               }));
  }

  getProducts(){
    return this.http.get<CargarProductos>(this.URL+'product/', {headers: this.headers})
             .pipe(
               map(resp=>{
                 const products = resp.results.map(
                   product => new Product(product.id, product.name, product.description, product.price,
                                          product.user, product.category,product.date_created, product.date_updated)
                 );
                 return {
                   total: resp.count,
                   next: resp.next,
                   previous: resp.previous,
                   products
                 }
               }));
  }

  getUsuarios(){
    return this.http.get<CargarCuentas>(this.URL+'account/', {headers: this.headers})
               .pipe(
                 map(resp=>{
                   const accounts = resp.results.map(
                     account => new Account(account.id, account.direction, account.email, account.first_name,
                                            account.last_name, account.phone_number, account.birth_date, account.password,
                                            account.is_admin, account.is_staff, account.is_superuser, account.user_img, 
                                            account.cover_img)
                   );
                   return {
                     total: resp.count,
                     next: resp.next,
                     previous: resp.previous,
                     accounts
                   }
                 })
               )
  }

  addOrden(order: Order){
    let params = JSON.stringify(order);
    this.http.post(this.URL+'order/', params, {headers: this.headers})
  }


}
