import {User} from '../auth/user'  
import {Currency} from './currency'
import {Category} from './category'

export class Product {
    constructor(
    public id:number,
    public name:string,
    public description:string,
    public price:number,
    public user:User,
    public category:Category[],
    public date_created:string,
    public date_updated:string){

    }

}
