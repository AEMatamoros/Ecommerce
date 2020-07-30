import {Account} from '../account/account'

export class Direction {
    constructor(
        public id:number,
        public direction:String,
        public relative:Direction[],
        public date_created:string,
        public date_updated:string){    
        }
}

export class Followers {
    constructor(
        public id:number,
        public follower_id:Account[],
        public followed_id:Account[],
        public follow_date:string){    
        }
}

export class Image {
    constructor(
        public id:number,
        public img_route:string,
        public date_created:string,
        public date_updated:string){    
        }
}

export class Puntuation {
    constructor(
        public id:number,
        public points:number,
        public comment:string,
        public evaluated_user_id:Account[],
        public evaluator_user_id:Account[],
        public follow_date:string,
    ){}   
}

export class Complaints {
    constructor(
        public id:number,
        public problem:string,
        public comment:string,
        public accuser_user_id:Account[],
        public denounced_user_id:Account[],
        public published:string,
    ){}   
}

