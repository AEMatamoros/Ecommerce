import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//rxjs
import { BehaviorSubject } from 'rxjs';

//modelos
import { CartModelPublic, CartModelServer } from '../models/cart/cart.model';
import { Product } from '../models/product/product';

//servicios
import { ProductsService } from '../services/products/products.service';
import { Product_Order } from '../models/order/product_Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public URL: string;
  private carritoData: CartModelPublic = { productData: [{ enCarrito: 0, product_id: 0 }], total: 0 };
  private carritoServer: CartModelServer = { productData:[{ product: undefined, numEnCarrito:0 }], total:0};

  //Observables-para actualizar
  totalCarrito$ = new BehaviorSubject<number>(0);
  dataCarrito$ = new BehaviorSubject<CartModelServer>(this.carritoServer);

  constructor(
    private productService: ProductsService,
    private router: Router
  ) 
  {
    this.totalCarrito$.next(this.carritoServer.total);
    this.dataCarrito$.next(this.carritoServer);

    //Obtener product al localstorage
    let info: CartModelPublic = JSON.parse(localStorage.getItem('carrito'));
    if (info !== null && info !== undefined && info.productData[0].enCarrito !== 0) {
      this.carritoData = info;
      this.carritoData.productData.forEach(p =>{
        this.productService.getProduct(p.product_id).subscribe((actualProduct:Product)=>{
          if (this.carritoServer.productData[0].numEnCarrito === 0) {
            this.carritoServer.productData[0].numEnCarrito = p.enCarrito;
            this.carritoServer.productData[0].product = actualProduct;
            this.calcularTotalPagar();
            this.carritoData.total = this.carritoServer.total;
            localStorage.setItem('carrito', JSON.stringify(this.carritoData));
          } else {
            this.carritoServer.productData.push({
              numEnCarrito: p.enCarrito,
              product: actualProduct
            });
            this.calcularTotalPagar();
            this.carritoData.total = this.carritoServer.total;
            localStorage.setItem('carrito', JSON.stringify(this.carritoData));
          }
          this.dataCarrito$.next({...this.carritoServer});
        });
      });
    }

  }

  addProductCarrito(id:number, cantidad?:number){
    
    this.productService.getProduct(id).subscribe(
      prod=>{
        //Cuando el carrito esta vacio
        if(this.carritoServer.productData[0].product == undefined){
          //Agregamos producto
          this.carritoServer.productData[0].product = prod;
          //Agregamos la cantidad
          this.carritoServer.productData[0].numEnCarrito = cantidad !== undefined ? cantidad: 1;
          //Calculamos el total a pagar
          this.calcularTotalPagar();
          //Actualizar data de carrito Data del server
          this.carritoData.productData[0].enCarrito = this.carritoServer.productData[0].numEnCarrito;
          this.carritoData.productData[0].product_id = prod.id;
          this.carritoData.total = this.carritoServer.total;
          //Editamos el local storage
          localStorage.setItem('carrito', JSON.stringify(this.carritoData));
          //Pasamos data a el observable
          this.dataCarrito$.next({...this.carritoServer});

          //Mensaje de sálida: Agregando al carrito
          const message = 'Producto agregado al carrito!';
          alert(message);

        }else{
          //Cuando el carrito ya tiene productos
          let index = this.carritoServer.productData.findIndex(p => p.product.id == prod.id);
          let orders:Product_Order;
          this.productService.getProductOrders().subscribe(
            prodOrder =>{
              orders = prodOrder
            }
          )
          
          if(index !== -1){
            if(cantidad !== undefined && cantidad <= orders.order_id['quantity']){
              this.carritoServer.productData[index].numEnCarrito = this.carritoServer.productData[index].numEnCarrito < orders.order_id['quantity'] ? cantidad : orders.order_id['quantity'];
            }else{
              this.carritoServer.productData[index].numEnCarrito < orders.order_id['quantity'] ? this.carritoServer.productData[index].numEnCarrito++ : orders.order_id['quantity'];
            }

            this.carritoData.productData[index].enCarrito = this.carritoServer.productData[index].numEnCarrito;
            //Mensaje de salida: cantidad actualizada en el carrito
            const message = 'Cantidad actualizada a el producto!';
            alert(message);

          }else{
            //Si no esta en el carrito
            this.carritoServer.productData.push({
              product: prod,
              numEnCarrito: 1
            });

            this.carritoData.productData.push({
              enCarrito: 1,
              product_id: prod.id
            });

            //Mensaje de salida: agregamos product al carrito
            const message = 'Producto agregado al carrito!';
            alert(message);
          }
          this.calcularTotalPagar();
          this.carritoData.total = this.carritoServer.total;
          localStorage.setItem('carrito', JSON.stringify(this.carritoData));
          this.dataCarrito$.next({...this.carritoServer});

        }
      }
    )
  }

  updateCarrito(index, incrementar:boolean){
    let data = this.carritoServer.productData[index];
    let orders:Product_Order;
    let cargado:boolean = false;
    this.productService.getProductOrders().subscribe(prodOrder =>{
      orders = prodOrder; 
      cargado = true;
    })
  
    if(incrementar){
      data.numEnCarrito < 5 ? data.numEnCarrito++ : 1;
      this.carritoData.productData[index].enCarrito = data.numEnCarrito;
      this.calcularTotalPagar();
      this.carritoData.total = this.carritoServer.total;
      this.dataCarrito$.next({...this.carritoServer});
      localStorage.setItem('carrito', JSON.stringify(this.carritoData));
    }else{
      data.numEnCarrito--;
      if (data.numEnCarrito < 1) {

        this.deleteProductCarrito(index);
        this.dataCarrito$.next({...this.carritoServer});
      } else {
        this.dataCarrito$.next({...this.carritoServer});
        this.carritoData.productData[index].enCarrito = data.numEnCarrito;
        this.calcularTotalPagar();
        this.carritoData.total = this.carritoServer.total;
        localStorage.setItem('carrito', JSON.stringify(this.carritoData));
      }
    }
  }

  deleteProductCarrito(index){
    if(window.confirm('Estas seguro de eliminar el producto del carrito?')){
      this.carritoServer.productData.splice(index, 1);
      this.carritoData.productData.splice(index, 1);
      this.calcularTotalPagar();
      this.carritoData.total = this.carritoServer.total;

      if (this.carritoData.total === 0) {
        this.carritoData = {productData: [{enCarrito: 0, product_id: 0}], total: 0};
        localStorage.setItem('carrito', JSON.stringify(this.carritoData));
      } else {
        localStorage.setItem('carrito', JSON.stringify(this.carritoData));
      }

      if(this.carritoServer.total == 0){
        this.carritoServer = {productData: [{product: undefined, numEnCarrito: 0}], total: 0};
        this.dataCarrito$.next({...this.carritoServer}); 
      }else{
        this.dataCarrito$.next({...this.carritoServer}); 
      }
    }else{
      return;
    }
  }

  private calcularTotalPagar() {
    let total = 0;

    this.carritoServer.productData.forEach(p => {
      const {numEnCarrito} = p;
      const {price} = p.product;
      total += numEnCarrito * price;
    });
    this.carritoServer.total = total;
    this.totalCarrito$.next(this.carritoServer.total);
  }

  subtotal(index){
    let subTotal = 0;

    let p = this.carritoServer.productData[index];
    
    subTotal = p.product.price * p.numEnCarrito;

    return subTotal;
  }

}
