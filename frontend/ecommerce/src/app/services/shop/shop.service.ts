import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private http: HttpClient ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  API_Url_Product_image='http://52.201.212.27/api/viewset/product_image/'
  API_Url_Products='http://52.201.212.27/api/viewset/product/'

  getProducts(){
    return this.http.get(this.API_Url_Products);
  }

  getProductsImage(){
    return this.http.get(this.API_Url_Product_image);
  }

}
