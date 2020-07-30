import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//Modelos
import { Product } from 'src/app/models/product/product';
import { Category } from 'src/app/models/product/category';
import { Currency} from 'src/app/models/product/currency';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_Url_Products='http://52.201.212.27/api/viewset/product/'
  API_Url_Currency='http://52.201.212.27/api/viewset/currency/'
  API_Url_Category='http://52.201.212.27/api/viewset/category/'
  constructor(private http: HttpClient) { }
  //Productos
  getProducts(){
    return this.http.get<Product[]>(this.API_Url_Products)
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  postProduct(product){
    return this.http.post<Product[]>(this.API_Url_Products, JSON.stringify(product),this.httpOptions)
  }

  putProduct(id,product){
    return this.http.put<Product[]>(this.API_Url_Products+''+id+'/', JSON.stringify(product),this.httpOptions)
  }
  deleteProduct(id){
    return this.http.delete<Product[]>(this.API_Url_Products+''+id+'/',this.httpOptions)
  }
  //Categorias
  getCategories(){
    return this.http.get<Category[]>(this.API_Url_Category)
  }
  //Moneda
  getCurrency(){
    return this.http.get<Currency[]>(this.API_Url_Currency)
  }
}
