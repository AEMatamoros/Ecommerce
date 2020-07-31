import {Direction} from '../general/general-models'
import {Image} from '../general/general-models'

export class Account {
    constructor(
        public id: number,
        public direction:Direction[],
        public email: string,
        public first_name: string,
        public last_name: string,
        public phone_number: string,
        public birth_date: string,
        public password: string,
        public is_admin:boolean,
        public is_staff:boolean,
        public is_superuser:boolean,
        public user_img: Image[] | string,
        public cover_img: Image[] | string
    ){}
}

