import { Injectable } from '@angular/core';
//Peticiones HTTP
import { HttpClient,HttpHeaders } from '@angular/common/http';
//Manejo de Errores
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//Modelos
import { Log } from 'src/app/models/log/log';
import { Action } from 'src/app/models/log/log';

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
  }

  postLog(Log){
    return this.http.post<Log[]>(this.API_Url_Log, JSON.stringify(Log),this.httpOptions)
  }

  putLog(id,Log){
    return this.http.put<Log[]>(this.API_Url_Log+''+id+'/', JSON.stringify(Log),this.httpOptions)
  }
  deleteLog(id){
    return this.http.delete<Log[]>(this.API_Url_Log+''+id+'/',this.httpOptions)
  }
  //Action
  getAction(){
    return this.http.get<Action[]>(this.API_Url_Action)
  }

  postAction(Action){
    return this.http.post<Action[]>(this.API_Url_Action, JSON.stringify(Action),this.httpOptions)
  }

  putAction(id,Action){
    return this.http.put<Action[]>(this.API_Url_Action+''+id+'/', JSON.stringify(Action),this.httpOptions)
  }
  deleteAction(id){
    return this.http.delete<Action[]>(this.API_Url_Action+''+id+'/',this.httpOptions)
  }
}
