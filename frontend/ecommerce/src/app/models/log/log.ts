import {Account} from '../account/account'
export class Action {
    constructor(
        public id:number,
        public crud_type:string,
        public date_created:string,
        public date_updated:string
    ){}
}

export class Log {
    constructor(
        public description:string,
        public user_id:Account[],
        public action_id:Action[]
    ){}
}