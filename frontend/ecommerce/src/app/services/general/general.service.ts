import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//Modelos
import {Complaints, Direction}  from 'src/app/models/general/general-models'
import {Puntuation}  from 'src/app/models/general/general-models'
import {Image}  from 'src/app/models/general/general-models'
import {Followers}  from 'src/app/models/general/general-models'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {//Complaints Puntuation Image Followers Direction
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  API_Url_Complaints="https://phoenixstore.site/api/viewset/complaints/"
  API_Url_Puntuation="https://phoenixstore.site/api/viewset/puntuation/"
  API_Url_Image="https://phoenixstore.site/api/viewset/image/"
  API_Url_Followers="https://phoenixstore.site/api/viewset/followers/"
  API_Url_Direction="https://phoenixstore.site/api/viewset/direction/"
  
  //Quejas
  getComplaints(){
    return this.http.get<Complaints[]>(this.API_Url_Complaints)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET COMPLAINTS')})
               );
  }

  postComplaints(Complaints){
    return this.http.post<Complaints[]>(this.API_Url_Complaints, JSON.stringify(Complaints),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR POST COMPLAINTS')})
               );
  }

  putComplaints(id,Complaints){
    return this.http.put<Complaints[]>(this.API_Url_Complaints+''+id+'/', JSON.stringify(Complaints),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT COMPLAINTS')})
               );
  }

  deleteComplaints(id){
    return this.http.delete<Complaints[]>(this.API_Url_Complaints+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR DELETE COMPLAINTS')})
               );
  }
  //Puntuacion
  getPuntuation(){
    return this.http.get<Puntuation[]>(this.API_Url_Puntuation)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET PUNTUATION')})
               );
  }

  postPuntuation(Puntuation){
    return this.http.post<Puntuation[]>(this.API_Url_Puntuation, JSON.stringify(Puntuation),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR POST PUNTUATION')})
               );
  }

  putPuntuation(id,Puntuation){
    return this.http.put<Puntuation[]>(this.API_Url_Puntuation+''+id+'/', JSON.stringify(Puntuation),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT PUNTUATION')})
               );
  }

  deletePuntuation(id){
    return this.http.delete<Puntuation[]>(this.API_Url_Puntuation+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR DELETE PUNTUATION')})
               );
  }

  //Imagenes
  getImage(){
    return this.http.get<Image[]>(this.API_Url_Image)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET IMAGE')})
               );
  }

  postImage(Image){
    return this.http.post<Image[]>(this.API_Url_Image, JSON.stringify(Image),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR POST IMAGE')})
               );
  }

  putImage(id,Image){
    return this.http.put<Image[]>(this.API_Url_Image+''+id+'/', JSON.stringify(Image),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT IMAGE')})
               );
  }

  deleteImage(id){
    return this.http.delete<Image[]>(this.API_Url_Image+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR DELETE IMAGE')})
               );
  }
  //Seguidores
  getFollowers(){
    return this.http.get<Followers[]>(this.API_Url_Followers)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET FOLLOWERS')})
               );
  }

  postFollowers(Followers){
    return this.http.post<Followers[]>(this.API_Url_Followers, JSON.stringify(Followers),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR POST FOLLOWERS')})
               );
  }

  putFollowers(id,Followers){
    return this.http.put<Followers[]>(this.API_Url_Followers+''+id+'/', JSON.stringify(Followers),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT FOLLOWERS')})
               );
  }

  deleteFollowers(id){
    return this.http.delete<Followers[]>(this.API_Url_Followers+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR DELETE FOLLOWERS')})
               );
  }
  //Direccion
  getDirection(){
    return this.http.get<Direction[]>(this.API_Url_Direction)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET DIRECTION')})
               );
  }

  postDirection(Direction){
    return this.http.post<Direction[]>(this.API_Url_Direction, JSON.stringify(Direction),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR POST DIRECTION')})
               );
  }

  putDirection(id,Direction){
    return this.http.put<Direction[]>(this.API_Url_Direction+''+id+'/', JSON.stringify(Direction),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT DIRECTION')})
               );
  }

  deleteDirection(id){
    return this.http.delete<Direction[]>(this.API_Url_Direction+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR DELETE DIRECTION')})
               );
  }
}
