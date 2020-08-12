import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

/*Modelo*/
import { User } from 'src/app/models/auth/user';
import { AuthLogin } from 'src/app/models/auth/auth-login';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public URL:string;
  public headers: HttpHeaders;
  public userToken: string;
  public id: number;

  constructor(
    private http: HttpClient,
    private router: Router) {
    /*this.URL = 'http://localhost:8000/api/auth/'; /*LOCAL*/
    this.URL = 'http://52.201.212.27/api/auth/'; /*PRODUCCION*/
    this.headers = new HttpHeaders().set('Content-Type','application/json');
    this.leerToken();
  }

  RegisterUser(user: User): Observable<any>{
    let params = JSON.stringify(user);

    return this.http.post(this.URL+'register', params, {headers:this.headers})
                    .pipe(
                      map(response =>{
                        this.guardarToken(response['token']);
                        return response;
                      })
                    );

  }

  loginUser(authLogin: AuthLogin){

    return this.http.post(this.URL+'login', authLogin, {headers: this.headers})
                    .pipe(
                        map(response =>{
                            this.guardarToken(response['token']);
                            this.guardarID(response['pk']);
                            return response;
                        })
                    );
  }

  logoutUser(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    this.router.navigateByUrl('/login');
  }

  private guardarToken(token: string){
    this.userToken = token;
    localStorage.setItem('token', token);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  public guardarID(id: number){
    this.id = id;
    localStorage.setItem('id', id.toString());
  }

  private leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    if(!this.userToken){
      return false;
    }
    
    if(this.userToken.length < 2){
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }

  }
}
