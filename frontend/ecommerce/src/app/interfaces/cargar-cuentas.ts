import { Account } from '../models/account/account';

export interface CargarCuentas {
    count: number;
    next: string;
    previous: string;
    results: Account[];
}
