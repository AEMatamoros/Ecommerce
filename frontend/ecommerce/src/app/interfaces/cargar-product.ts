
import { Product } from '../models/product/product';

export interface CargarProductos {
    count: number;
    next: string;
    previous: string;
    results: Product[];
}
