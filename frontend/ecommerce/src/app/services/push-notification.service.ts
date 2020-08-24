import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Subscription } from 'rxjs';
//const SERVER_URL = 'http://localhost:3000/subscription';
const SERVER_URL = 'https://unah-push-notifications.herokuapp.com/subscription';

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
}


