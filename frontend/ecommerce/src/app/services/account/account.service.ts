import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//Modelos
import { Account } from 'src/app/models/account/account';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  API_Url_Account='https://phoenixstore.site/api/viewset/account/'
  //API_Url_Account="http://127.0.0.1:8000/api/viewset/account/"

  getAccounts(){
    return this.http.get<Account[]>(this.API_Url_Account,this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET ACCOUNTS')})
               );
  }
  getAccount(id){
    //console.log(this.API_Url_Account+''+id+"/");
    return this.http.get<Account[]>(this.API_Url_Account+''+id+"/",this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET ACCOUNT')})
               );
  }
  putAccount(id,account){
    return this.http.put<Account[]>(this.API_Url_Account+''+id+"/",JSON.stringify(account),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT ACCOUNT')})
               );
  }
}
