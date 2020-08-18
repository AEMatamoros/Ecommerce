export class AdminOrder {
    constructor(
        public id:number,
        public subtotal:number,
        public quantity:number,
        public isv:number,
        public total:number,
        public status_id:number,
        public direction_id:number
    ){}
}