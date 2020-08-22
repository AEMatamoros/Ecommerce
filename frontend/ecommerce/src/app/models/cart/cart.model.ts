import { Product_Order } from '../order/product_Order';

export interface CartModelServer {
    total: number;
    productData: [{
      product: Product_Order,
      numEnCarrito: number
    }];
  }
  
  export interface CartModelPublic {
    total: number;
    productData: [{
      product_id: number,
      enCarrito: number
    }]
  }