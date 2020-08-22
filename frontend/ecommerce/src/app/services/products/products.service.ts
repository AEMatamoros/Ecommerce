import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
//Modelos
import { Product } from 'src/app/models/product/product';
import { AdminProduct } from 'src/app/models/product/AdminProduct';
import { Product_Order } from 'src/app/models/order/product_Order';
import { Category } from 'src/app/models/product/category';
import { Currency} from 'src/app/models/product/currency';
import { ProductImages} from 'src/app/models/product/product-images';
import { Ventas} from 'src/app/models/general/ventas'

//Servicios
import { OrdenesService } from '../panelAdmin/ordenes.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private orderService: OrdenesService,
    private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
 
  API_Url_Products='https://phoenixstore.site/api/viewset/product/'
  API_Url_Currency='https://phoenixstore.site/api/viewset/currency/'
  API_Url_Category='https://phoenixstore.site/api/viewset/category/'
  API_Url_Product_images="https://phoenixstore.site/api/viewset/product_image/"
  API_Url_Sells="https://phoenixstore.site/api/viewset/sells/"
  API_Url_all_Products="https://phoenixstore.site/api/viewset/all_products/"
  API_Url_all_Product_images="https://phoenixstore.site/api/viewset/all_product_images/"
  API_Url_Products_Orders = "https://phoenixstore.site/api/viewset/product_order/"
  
  //Productos
  getAllProducts(){
    return this.http.get<Product[]>(this.API_Url_all_Products).pipe(
      catchError(err=>{
        return throwError('ERROR PETICION GET PRODUCTS');
      })
    )
  }
  getProducts(){
    return this.http.get<Product[]>(this.API_Url_Products).pipe(
      catchError(err=>{
        return throwError('ERROR PETICION GET PRODUCTS');
      })
    )
  }

  getProduct(id:number){
    return this.http.get<Product>(this.API_Url_Products+id+'/').pipe(
      catchError(err=>{
        return throwError('ERROR PETICION GET PRODUCTO');
      })
    );
  }

  getIdOrder(product_id: number){
    let product_order: Product_Order = null;
    this.getProductOrders().subscribe(
      prod=>{
        let index = prod.product_id.findIndex(product=> product.id == product_id );
        if(index !== -1){
          //Crear orden de compra 
          
          product_order[index] = null;
        }else{
          product_order[index] = prod;
        }
      }
    )
    return product_order;
  }

  getProductOrders(){
    return this.http.get<Product_Order>(this.API_Url_Products_Orders).pipe(
      catchError(err=> { return throwError('ERROR PETICION GET ALL PRODUCT_ORDER');})
    )
  }

  getProductOrder(id:number){
    let id_order = this.getIdOrder(id);
    return this.http.get<Product_Order>(this.API_Url_Products_Orders+id_order+'/').pipe(
      catchError(err=>{ return throwError('ERROR PETICION GET PRODUCT_ORDER');})
    )
  }

  postProduct(product){
    return this.http.post<Product[]>(this.API_Url_Products, JSON.stringify(product),this.httpOptions)
                    .pipe(
                      catchError(err=>{
                        return throwError('ERROR PETICION AGREGAR PRODUCTO');
                      })
                    )
  }

  //Agregar producto (No me funciona postProduct, para no borrar lo de arriba hago esto)
  addProducto(product: AdminProduct){
    let params = JSON.stringify(product);
    return this.http.post(this.API_Url_Products, params, this.httpOptions)
                    .pipe(
                      map(
                        resp => {
                          return resp;
                        }
                      ),
                      catchError(err=>{
                        return throwError('ERROR PETICION ADD PRODUCTO');
                      })
                    );
  }

  putProduct(id:number, product: AdminProduct|any){
    return this.http.put<AdminProduct>(this.API_Url_Products+id+'/',JSON.stringify(product),this.httpOptions)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION ACTUALIZAR PRODUCTO');
                 })
               )
  }

  deleteProduct(id:number){
    return this.http.delete<Product[]>(this.API_Url_Products+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION BORRAR PRODUCTO');
                 })
               )
  }
  //Product-Images
  //Productos
  getProductsImages(){
    return this.http.get<ProductImages[]>(this.API_Url_Product_images)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION GET PRODUCTO-IMAGENES');
                 })
               )
  }
  getAllProductsImages(){
    return this.http.get<ProductImages[]>(this.API_Url_all_Product_images)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION GET PRODUCTO-IMAGENES');
                 })
               )
  }
  getProductImage(id: number){

    return this.http.get<ProductImages>(this.API_Url_Product_images+id+'/')
               .pipe(catchError(err=> throwError('ERROR PETICION GET PRODUCTO-IMAGEN')))
  }

  getProductsImagesPages(desde: number){
    return this.http.get<ProductImages[]>(this.API_Url_Product_images+'?page='+desde, this.httpOptions)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION PRODUCTO-IMAGENES PAGINADAS');
                 })
               );
  }
  
  
  postProductImages(ProductImages){
    console.log(JSON.stringify(ProductImages));
    return this.http.post<ProductImages[]>(this.API_Url_Product_images, JSON.stringify(ProductImages),this.httpOptions)
               .pipe(catchError(err=>{return throwError('ERROR PETICION CREAR PRODUCTO-IMAGEN');}))
  }
  
  putProductImages(id,ProductImages){
    return this.http.put<ProductImages[]>(this.API_Url_Product_images+''+id+'/', JSON.stringify(ProductImages),this.httpOptions)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION EDITAR PRODUCTO-IMAGEN');
                 })
               )
  }
  deleteProductImages(id){
    return this.http.delete<ProductImages[]>(this.API_Url_Product_images+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION BORRAR PRODUCTO-IMAGEN');
                 })
               )
  }
  //Categorias
  getCategory(){
    return this.http.get<Category[]>(this.API_Url_Category)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION GET CATEGORIAS');
                 })
               )
  }
  postCategories(Category){
    return this.http.post<Category[]>(this.API_Url_Category, JSON.stringify(Category),this.httpOptions)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION AGREGAR CATEGORIA');
                 })
               )
  }

  putCategory(id,Category){
    return this.http.put<Category[]>(this.API_Url_Category+''+id+'/', JSON.stringify(Category),this.httpOptions)
               .pipe(
                 catchError(err=>{
                   return throwError('ERROR PETICION EDITAR CATEGORIA');
                 })
               )
  }
  deleteCategory(id){
    return this.http.delete<Category[]>(this.API_Url_Category+''+id+'/',this.httpOptions)
               .pipe(catchError(err=> throwError('ERROR PETICION ELIMINAR CATEGORIA'))); 
  }
  //Moneda
  getCurrency(){
    return this.http.get<Currency[]>(this.API_Url_Currency)
               .pipe(catchError(err=> throwError('ERROR PETICION GET MONEDAS'))); 
  }
  postCurrency(product){
    return this.http.post<Currency[]>(this.API_Url_Currency, JSON.stringify(Currency),this.httpOptions)
               .pipe(
                 catchError(err=>{ return throwError('ERROR PETICION AGREGAR MONEDA')})
               );
  }

  putCurrency(id,product){
    return this.http.put<Currency[]>(this.API_Url_Currency+''+id+'/', JSON.stringify(Currency),this.httpOptions)
               .pipe(catchError(err=> throwError('ERROR PETICION ACTUALIZAR MONEDA')));
  }
  deleteCurrency(id){
    return this.http.delete<Currency[]>(this.API_Url_Currency+''+id+'/',this.httpOptions)
               .pipe(catchError(err=> throwError('ERROR PETICION ELIMINAR MONEDA')));
  }
  //Sells
  getSells(){
    return this.http.get<Ventas[]>(this.API_Url_Sells)
               .pipe(catchError(err=> throwError('ERROR PETICION GET Sell'))); 
  }
  postSells(sell){
    return this.http.post<Ventas[]>(this.API_Url_Sells, JSON.stringify(sell),this.httpOptions)
               .pipe(
                 catchError(err=>{ return throwError('ERROR PETICION POST Sell')})
               );
  }
}
