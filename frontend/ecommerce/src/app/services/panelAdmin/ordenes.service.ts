import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

//rxjs
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Interfaces
import { Ordenes } from '../../interfaces/ordenes';
import { CargarStatus } from 'src/app/interfaces/cargar-status';
import { CargarProductos } from 'src/app/interfaces/cargar-product';
import { CargarCuentas } from 'src/app/interfaces/cargar-cuentas';
import { CargarDirections } from 'src/app/interfaces/cargar-directions';
//Modelos
import { Status } from 'src/app/models/general/general-models';
import { Product } from 'src/app/models/product/product';
import { Account } from 'src/app/models/account/account';
import { Order } from 'src/app/models/order/order';
import { AdminOrder } from 'src/app/models/order/AdminOrder';
import { Direccion } from 'src/app/interfaces/direccion';
import { ProductOrder } from 'src/app/models/order/productOrder';

//Servicios
import { UserService } from 'src/app/services/auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  public URL: string;
  public headers: HttpHeaders;
  //ordenes
  public orders:Ordenes[];
  public status: CargarStatus[];
  public direcciones: CargarDirections[];
  public products: CargarProductos[];
  
  constructor(
    private http: HttpClient,
    private auth: UserService
  ) { 
    //this.URL = 'http://localhost:8000/api/viewset/'; /*Local*/
    this.URL= 'https://phoenixstore.site/api/viewset/'; //PRODUCCION */
    this.headers = new HttpHeaders()
    this.headers = this.headers.append('Content-Type','application/json');
    
  }

  getOrdenes(){
    return this.http.get(this.URL+'product_order/', {headers: this.headers})
            .pipe(
               map((orders: Ordenes[])=>this.orders = orders),
               catchError(err=>{return throwError('ERROR PETICION GET ORDENES');})
            );
  }

  getOrden(id:number){
    return this.http.get(this.URL+'order/'+id+'/', {headers: this.headers})
             .pipe(
               map((order: Ordenes[])=> this.orders = order),
              catchError(err=>{return throwError('ERROR PETICION GET ORDEN');})
             );
  }

  getDirections(){
    return this.http.get<CargarDirections>(this.URL+'direction/', {headers: this.headers})
               .pipe(
                 map(resp=>{
                   const directions = resp.results.map(
                     direccion => new Direccion(direccion.id, direccion.direction)
                   );
                   return {
                     total: resp.count,
                     next: resp.next,
                     previous: resp.previous,
                     directions
                   }
                 }),
                 catchError(err=>{return throwError('ERROR PETICION GET DIRECCIONES');})
               );
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
               }),
               catchError(err=>{
                 return throwError('ERROR PETICION GET STATUS');
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
               }),
               catchError(err=>{
                 return throwError('ERROR PETICION GET PRODUCTOS');
               })
               );
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
                 }),
                 catchError(err=>{
                   return throwError('ERROR PETICION GET USUARIOS');
                 })
               )
  }

  addOrden(order: AdminOrder){
    let params = JSON.stringify(order);
    console.log('orden service', params);
    return this.http.post(this.URL+'order/', params, {headers: this.headers}).pipe(
      catchError(err=>{
        return throwError('ERROR PETICION AGREGAR ORDEN', err);
      })
    )
  }

  deleteOrden(id: number){
    this.headers = this.headers.append('Authorization', 'Token '+this.auth.userToken);
    return this.http.delete(this.URL+'order/'+id+'/', {headers: this.headers})
               .pipe(
                 map(resp=>{ return resp;}), 
                 catchError(err=>{ return throwError('ERROR PETICION BORRAR ORDEN');
              }))
  }

  addProductOrden(product_order: ProductOrder){
    let params = JSON.stringify(product_order);
    return this.http.post(this.URL+'product_order/', params, {headers: this.headers}).pipe(
      catchError(err=>{ return throwError('ERROR PETICION AGREGAR PRODUCTO-ORDEN');})
    )
  }

  deleteProductOrden(id: number){
    this.headers = this.headers.append('Authorization', 'Token '+this.auth.userToken);
    return this.http.delete(this.URL+'product_order/'+id+'/', {headers: this.headers})
               .pipe(
                 map(resp=>{ return resp;}), 
                 catchError(err=>{ return throwError('ERROR PETICION BORRAR PRODUCT-ORDEN');
              }))
  }


}
