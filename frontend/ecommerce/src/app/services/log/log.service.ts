import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//Modelos
import { Log } from '../../models/log/log';
import { Action } from '../../models/log/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  API_Url_Log='http://52.201.212.27/api/viewset/log/'
  API_Url_Action='http://52.201.212.27/api/viewset/action/'

  //Log
  getLog(){
    return this.http.get<Log[]>(this.API_Url_Log)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET LOG')})
               );
  }

  postLog(Log){
    return this.http.post<Log[]>(this.API_Url_Log, JSON.stringify(Log),this.httpOptions)
               .pipe(
                  catchError(err=>{return throwError('ERROR POST LOG')})
                );
  }

  putLog(id,Log){
    return this.http.put<Log[]>(this.API_Url_Log+''+id+'/', JSON.stringify(Log),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT LOG')})
               );
  }
  deleteLog(id){
    return this.http.delete<Log[]>(this.API_Url_Log+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR DELETE LOG')})
               );
  }
  //Action
  getAction(){
    return this.http.get<Action[]>(this.API_Url_Action)
               .pipe(
                 catchError(err=>{return throwError('ERROR GET ACTION')})
               );
  }

  postAction(Action){
    return this.http.post<Action[]>(this.API_Url_Action, JSON.stringify(Action),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR POST ACTION')})
               );
  }

  putAction(id,Action){
    return this.http.put<Action[]>(this.API_Url_Action+''+id+'/', JSON.stringify(Action),this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR PUT ACTION')})
               );
  }
  deleteAction(id){
    return this.http.delete<Action[]>(this.API_Url_Action+''+id+'/',this.httpOptions)
               .pipe(
                 catchError(err=>{return throwError('ERROR DELETE ACTION')})
               );
  }
}
