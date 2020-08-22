import { Product } from '../product/product';
import { Order } from '../order/order';

export class Product_Order {
    constructor(
        public id: number,
        public product_id: Product[],
        public order_id: Order[]
    ){}
}