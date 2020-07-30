import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//Modelo
import { Account } from '../../models/account/account';
import { Image } from '../../models/general/general-models';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public URL:string;
  public headers: HttpHeaders;
  public accounts: Account[] = [];
  public image: Image[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.URL = 'http://52.201.212.27/api/viewset/';
  }

  obtenerCuentas(){
    
    return this.http.get(this.URL+'account/', {headers: this.headers})
               .pipe(
                 map((accounts: Account[]) => this.accounts = accounts)
               );
  }

  obtenerImagen(){
    return this.http.get(this.URL+'image/', {headers: this.headers})
               .pipe(
                 map((image: Image[]) => this.image = image)
               );
  }
}