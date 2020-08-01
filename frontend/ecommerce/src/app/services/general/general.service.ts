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

  API_Url_Complaints="http://52.201.212.27/api/viewset/complaints/"
  API_Url_Puntuation="http://52.201.212.27/api/viewset/puntuation/"
  API_Url_Image="http://52.201.212.27/api/viewset/image/"
  API_Url_Followers="http://52.201.212.27/api/viewset/followers/"
  API_Url_Direction="http://52.201.212.27/api/viewset/direction/"
  
  //Quejas
  getComplaints(){
    return this.http.get<Complaints[]>(this.API_Url_Complaints)
  }

  postComplaints(Complaints){
    return this.http.post<Complaints[]>(this.API_Url_Complaints, JSON.stringify(Complaints),this.httpOptions)
  }

  putComplaints(id,Complaints){
    return this.http.put<Complaints[]>(this.API_Url_Complaints+''+id+'/', JSON.stringify(Complaints),this.httpOptions)
  }

  deleteComplaints(id){
    return this.http.delete<Complaints[]>(this.API_Url_Complaints+''+id+'/',this.httpOptions)
  }
  //Puntuacion
  getPuntuation(){
    return this.http.get<Puntuation[]>(this.API_Url_Puntuation)
  }

  postPuntuation(Puntuation){
    return this.http.post<Puntuation[]>(this.API_Url_Puntuation, JSON.stringify(Puntuation),this.httpOptions)
  }

  putPuntuation(id,Puntuation){
    return this.http.put<Puntuation[]>(this.API_Url_Puntuation+''+id+'/', JSON.stringify(Puntuation),this.httpOptions)
  }

  deletePuntuation(id){
    return this.http.delete<Puntuation[]>(this.API_Url_Puntuation+''+id+'/',this.httpOptions)
  }

  //Imagenes
  getImage(){
    return this.http.get<Image[]>(this.API_Url_Image)
  }

  postImage(Image){
    return this.http.post<Image[]>(this.API_Url_Image, JSON.stringify(Image),this.httpOptions)
  }

  putImage(id,Image){
    return this.http.put<Image[]>(this.API_Url_Image+''+id+'/', JSON.stringify(Image),this.httpOptions)
  }

  deleteImage(id){
    return this.http.delete<Image[]>(this.API_Url_Image+''+id+'/',this.httpOptions)
  }
  //Seguidores
  getFollowers(){
    return this.http.get<Followers[]>(this.API_Url_Followers)
  }

  postFollowers(Followers){
    return this.http.post<Followers[]>(this.API_Url_Followers, JSON.stringify(Followers),this.httpOptions)
  }

  putFollowers(id,Followers){
    return this.http.put<Followers[]>(this.API_Url_Followers+''+id+'/', JSON.stringify(Followers),this.httpOptions)
  }

  deleteFollowers(id){
    return this.http.delete<Followers[]>(this.API_Url_Followers+''+id+'/',this.httpOptions)
  }
  //Direccion
  getDirection(){
    return this.http.get<Direction[]>(this.API_Url_Direction)
  }

  postDirection(Direction){
    return this.http.post<Direction[]>(this.API_Url_Direction, JSON.stringify(Direction),this.httpOptions)
  }

  putDirection(id,Direction){
    return this.http.put<Direction[]>(this.API_Url_Direction+''+id+'/', JSON.stringify(Direction),this.httpOptions)
  }

  deleteDirection(id){
    return this.http.delete<Direction[]>(this.API_Url_Direction+''+id+'/',this.httpOptions)
  }
}
