import {Direction} from '../general/general-models'

export class Status {
    constructor(
        public id:number,
        public description:string,
        public date_created:string,
        public date_updated:string
    ){}
}

export class Order {
    constructor(
        public id:number,
        public subtotal:number,
        public quantity:number,
        public isv:number,
        public total:number,
        public status_id:Status[],
        public direction:Direction[]
    ){}
}
