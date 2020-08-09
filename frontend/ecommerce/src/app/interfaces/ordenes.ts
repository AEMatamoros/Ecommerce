//Modelos
import { Order } from 'src/app/models/order/order';

export interface Ordenes {
    count: number,
    next: string,
    previus: string,
    results: Order[]
}
