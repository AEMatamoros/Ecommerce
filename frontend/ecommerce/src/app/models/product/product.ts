import {User} from '../auth/user'  
import {Currency} from './currency'
import {Category} from './category'

export class Product {
    constructor(
    public id:number,
    public name:String,
    public description:String,
    public price:number,
    public user:User,
    public category:Category[],
    public date_created:String,
    public date_updated:String){

    }

}
