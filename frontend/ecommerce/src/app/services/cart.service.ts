import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//rxjs
import { BehaviorSubject } from 'rxjs';

//modelos
import { CartModelPublic, CartModelServer } from '../models/cart/cart.model';

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

  }

  addProductCarrito(id:number, cantidad?:number){
    
    this.productService.getProductOrder(id).subscribe(
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
          this.carritoData.productData[0].product_id = prod.product_id['id'];
          this.carritoData.total = this.carritoServer.total;
          //Editamos el local storage
          localStorage.setItem('carrito', JSON.stringify(this.carritoData));
          //Pasamos data a el observable
          this.dataCarrito$.next({...this.carritoServer});

          //Mensaje de sálida: Agregando al carrito

        }else{
          //Cuando el carrito ya tiene productos
          let index = this.carritoServer.productData.findIndex(p => p.product.product_id['id'] == prod.id);
          
          if(index !== -1){
            if(cantidad !== undefined && cantidad <= prod.order_id['quantity']){
              this.carritoServer.productData[index].numEnCarrito = this.carritoServer.productData[index].numEnCarrito < prod.order_id['quantity'] ? cantidad : prod.order_id['quantity'];
            }else{
              this.carritoServer.productData[index].numEnCarrito < prod.order_id['quantity'] ? this.carritoServer.productData[index].numEnCarrito++ : prod.order_id['quantity'];
            }

            this.carritoData.productData[index].enCarrito = this.carritoServer.productData[index].numEnCarrito;
            //Mensaje de salida: cantidad actualizada en el carrito
          }else{
            //Si no esta en el carrito
            this.carritoServer.productData.push({
              product: prod,
              numEnCarrito: 1
            });

            this.carritoData.productData.push({
              enCarrito: 1,
              product_id: prod.product_id['id']
            });

            //Mensaje de salida: agregamos product al carrito
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
    
    if(incrementar){
      data.numEnCarrito < data.product.order_id['quantity'] ? data.numEnCarrito++ : data.product.order_id['quantity'];
      this.carritoData.productData[index].enCarrito = data.numEnCarrito;
      this.calcularTotalPagar();
      this.carritoData.total = this.carritoServer.total;
      this.dataCarrito$.next({...this.carritoServer});
      localStorage.setItem('cart', JSON.stringify(this.carritoData));
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
        localStorage.setItem('cart', JSON.stringify(this.carritoData));
      }
    }
  }

  deleteProductCarrito(index){
    if(window.confirm('Estas seguro de elimar el producto del carrito?')){
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
      const price = p.product.product_id['price'];
      total += numEnCarrito * price;
    });
    this.carritoServer.total = total;
    this.totalCarrito$.next(this.carritoServer.total);
  }

}
