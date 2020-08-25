import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';


import { Subscription } from 'rxjs';
//const SERVER_URL = 'http://localhost:3000/subscription';
const SERVER_URL = 'https://notificationsfrontend.herokuapp.com/subscription';
//const NOTIFICATION_URL ="http://localhost:3000/sendNotification"
const NOTIFICATION_URL ="https://notificationsfrontend.herokuapp.com/sendNotification"

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  public sendSubscriptionToServer(subscription: PushSubscription)
  {
    return this.http.post(SERVER_URL, JSON.stringify(subscription),this.httpOptions);
  }

  notificationCall(productname){
    return this.http.post(NOTIFICATION_URL, JSON.stringify({"title":"Nuevo Producto","body":"Un usuario ha agregado "+productname +" a su lista de productos"}),this.httpOptions)
                    .pipe(
                      catchError(err=>{
                        return throwError('ERROR aviso de Notificacion');
                      })
                    )
  }
}


