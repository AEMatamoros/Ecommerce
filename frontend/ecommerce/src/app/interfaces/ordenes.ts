//Modelos
import { Status, Direction } from '../models/general/general-models';

export interface Ordenes {
    id: number,
    subtotal: number,
    quantity: number,
    isv: number,
    total: number,
    status_id: Status,
    direccion_id: Direction
}
