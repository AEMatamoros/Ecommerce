import { Product } from '../product/product';
import {Account} from '../account/account'

export class Ventas {
    constructor(
        public id:number,
        public date:string,
        public seller_user_id:Account[],
        public costumer_user_id:Account[],
        public product_id:Product[] |any,
    ){}   
}
