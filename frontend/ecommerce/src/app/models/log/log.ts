import {Account} from '../account/account'
export class Action {
    constructor(
        public id:number,
        public crud_type:string
    ){}
}

export class Log {
    constructor(
        public description:string,
        public user_id:number,
        public action_id:number
    ){}
}