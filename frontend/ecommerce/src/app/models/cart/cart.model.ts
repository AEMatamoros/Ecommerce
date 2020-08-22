import { Product } from '../product/product';

export interface CartModelServer {
    total: number;
    productData: [{
      product: Product,
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