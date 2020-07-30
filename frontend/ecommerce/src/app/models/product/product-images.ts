import {Image} from '../general/general-models';
import {Product} from '../product/product';

export class ProductImages {
    constructor(
        public id:number,
        public image_id:Image[],
        public product_id:Product[],

    ){} 
}