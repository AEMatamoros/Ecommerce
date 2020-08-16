import { Direction } from '../models/directions/directions';

export interface CargarDirections {
    count: number;
    next: string;
    previous: string;
    results: Direction[];
}
