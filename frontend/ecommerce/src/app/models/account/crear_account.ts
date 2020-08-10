
import { Direccion } from 'src/app/interfaces/direccion'

export class Admin_Account {
    constructor(
        public id: number,
        public direction:number,
        public email: string,
        public first_name: string,
        public last_name: string,
        public phone_number: string,
        public birth_date: string,
        public password: string,
        public is_admin:boolean,
        public is_staff:boolean,
        public is_superuser:boolean,
        public user_img: number,
        public cover_img: number
    ){}
}

