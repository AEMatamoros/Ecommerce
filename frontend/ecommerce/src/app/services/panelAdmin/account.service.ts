import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Interfaces
import {CargarCuentas } from 'src/app/interfaces/cargar-cuentas';
//Modelos
import { Account } from 'src/app/models/account/account';
import { Admin_Account } from 'src/app/models/account/crear_account';
import { Image } from 'src/app/models/general/general-models';
//Servicios
import { UserService } from 'src/app/services/auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public URL:string;
  public headers: HttpHeaders;
  public accounts: Account[] = [];
  public account: Account[];
  public images: Image[] = [];

  constructor(
    private http: HttpClient,
    private auth: UserService
  ) {
    this.URL = 'http://localhost:8000/api/viewset/'; /*LOCAL*/
    /*this.URL = 'http://52.201.212.27/api/viewset/'; PRODUCCION*/
    this.headers = new HttpHeaders()
    this.headers = this.headers.append('Content-Type','application/json');
    
  }

  obtenerCuentas(){
    
    return this.http.get(this.URL+'account/', {headers: this.headers})
               .pipe(
                 map((accounts: Account[]) => this.accounts = accounts)
               );
  }

  obtenerCuenta(id:number){
    return this.http.get<Account[]>(this.URL+'account/'+id+"/",{headers: this.headers})
    .pipe(
      map(response =>{

        const account = response
        
        this.account = account;
        return this.account;
      })
    )
  }


  obtenerCuentasPaginadas(desde:number){
    return this.http.get<CargarCuentas>(this.URL+'account/?page='+desde, {headers: this.headers})
               .pipe(
                 map( response => {
                    const cuentas = response.results.map(
                      account => new Account(account.id, account.direction, account.email, account.first_name, 
                                            account.last_name, account.phone_number,account.birth_date,
                                            account.phone_number,account.is_admin,account.is_staff,
                                            account.is_superuser, account.user_img, account.cover_img)
                    );
                    return {
                      total: response.count,
                      next: response.next,
                      previous: response.previous,
                      cuentas
              
                    };
                 })
               )
  }

  obtenerImagenes(){
    return this.http.get(this.URL+'image/', {headers: this.headers})
               .pipe(
                 map((image: Image[]) => this.images = image)
               );
  }

  crearCuenta(account: Admin_Account): Observable<any>{
    let params = JSON.stringify(account);
    return this.http.post(this.URL+'account/', params, {headers: this.headers})
               .pipe(
                 map( response => {
                   console.log(response);
                   return response;
                 })
               );
  }

  actualizarCuenta(account: Admin_Account, id:number): Observable<any>{
    let params = JSON.stringify(account);
    return this.http.put(this.URL+'account/'+id+'/', params, {headers: this.headers})
                    .pipe(
                      map( resp => {
                        console.log(resp);
                        return resp;
                      })
                    )
  }

  borrarCuenta(id:number){
    
    console.log('token ',this.auth.userToken);
    this.headers = this.headers.append('Authorization', 'Token '+this.auth.userToken);
    console.log(this.headers);

    return this.http.delete(this.URL+'account/'+id+'/', {headers: this.headers})
                    .pipe(
                      map(resp => {
                        console.log(resp);
                        return resp;
                      })
                    )
  }
}
