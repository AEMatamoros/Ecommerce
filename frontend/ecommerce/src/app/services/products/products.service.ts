import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
//Modelos
import { Product } from 'src/app/models/product/product';
import { AdminProduct } from 'src/app/models/product/AdminProduct';
import { Category } from 'src/app/models/product/category';
import { Currency} from 'src/app/models/product/currency';
import { ProductImages} from 'src/app/models/product/product-images';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  API_Url_Products='http://52.201.212.27/api/viewset/product/'
  API_Url_Currency='http://52.201.212.27/api/viewset/currency/'
  API_Url_Category='http://52.201.212.27/api/viewset/category/'
  API_Url_Product_images="http://52.201.212.27/api/viewset/product_image/"
  //Productos
  getProducts(){
    return this.http.get<Product[]>(this.API_Url_Products)
  }

  getProduct(id:number){
    return this.http.get<Product>(this.API_Url_Products+id+'/');
  }

  postProduct(product){
    return this.http.post<Product[]>(this.API_Url_Products, JSON.stringify(product),this.httpOptions)
  }

  putProduct(id:number, product: AdminProduct|any){
    return this.http.put<AdminProduct>(this.API_Url_Products+id+'/', JSON.stringify(product),this.httpOptions)
  }

  deleteProduct(id:number){
    return this.http.delete<Product[]>(this.API_Url_Products+''+id+'/',this.httpOptions)
  }
  //Product-Images
  //Productos
  getProductsImages(){
    return this.http.get<ProductImages[]>(this.API_Url_Product_images)
  }

  postProductImages(ProductImages){
    return this.http.post<ProductImages[]>(this.API_Url_Product_images, JSON.stringify(ProductImages),this.httpOptions)
  }

  putProductImages(id,ProductImages){
    return this.http.put<ProductImages[]>(this.API_Url_Product_images+''+id+'/', JSON.stringify(ProductImages),this.httpOptions)
  }
  deleteProductImages(id){
    return this.http.delete<ProductImages[]>(this.API_Url_Product_images+''+id+'/',this.httpOptions)
  }
  //Categorias
  getCategory(){
    return this.http.get<Category[]>(this.API_Url_Category)
  }
  postCategories(Category){
    return this.http.post<Category[]>(this.API_Url_Category, JSON.stringify(Category),this.httpOptions)
  }

  putCategory(id,Category){
    return this.http.put<Category[]>(this.API_Url_Category+''+id+'/', JSON.stringify(Category),this.httpOptions)
  }
  deleteCategory(id){
    return this.http.delete<Category[]>(this.API_Url_Category+''+id+'/',this.httpOptions)
  }
  //Moneda
  getCurrency(){
    return this.http.get<Currency[]>(this.API_Url_Currency)
  }
  postCurrency(product){
    return this.http.post<Currency[]>(this.API_Url_Currency, JSON.stringify(Currency),this.httpOptions)
  }

  putCurrency(id,product){
    return this.http.put<Currency[]>(this.API_Url_Currency+''+id+'/', JSON.stringify(Currency),this.httpOptions)
  }
  deleteCurrency(id){
    return this.http.delete<Currency[]>(this.API_Url_Currency+''+id+'/',this.httpOptions)
  }
}
