import { Status } from '../models/general/general-models';

export interface CargarStatus {
    count: number;
    next: string;
    previous: string;
    results: Status[];
}
