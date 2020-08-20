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

  API_Url_Product_image='https://phoenixstore.site/api/viewset/all_product_images/';
  API_Url_Products='https://phoenixstore.site/api/viewset/all_products/';
  API_Url_Category='https://phoenixstore.site/api/viewset/category/';


  getProducts(){
    return this.http.get(this.API_Url_Products);
  }

  getProductsImage(){
    return this.http.get(this.API_Url_Product_image);
  }

  getCategory(){
    return this.http.get(this.API_Url_Category);
  }

}
