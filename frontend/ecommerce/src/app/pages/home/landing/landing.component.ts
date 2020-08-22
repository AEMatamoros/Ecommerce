import { Component, OnInit, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { interval } from 'rxjs';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styles: [
  ]
})
export class LandingComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private update: SwUpdate,
    private appRef: ApplicationRef,
    private swPush: SwPush,
  ) { this.updateClient();this.checkUpdate();}

  public_key="BCZkqQfeV4ATIKJZAQfBcPo0eSLtOC4i2WBJmJTVWv-dAeroyvCl4IMydeF03ZV0BKcpjLyYk8hhxevEbbFGksU"
  apiData: any;

  ngOnInit(): void {
    this.pushSuscription();

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });

  
  }


  updateClient() {
    if (!this.update.isEnabled) {
      console.log('Actualizaciones Desabilitadas');
      return;
    }
    this.update.available.subscribe((event) => {
      console.log(`Actual`, event.current, `Disponible`, event.available);
      if (confirm('Actualizacion disponible para la aplicacion se han agregado productos')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log(`Actual`, event.previous, `Disponible`, event.current);
    });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.update.checkForUpdate().then(() => console.log('Revisando'));
          console.log('Actualizacion Revisada');
        });
      }
    });
  }

  pushSuscription(){
    if(!this.swPush.isEnabled){
      console.log("Las notificaciones no estan activadas");
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: this.public_key,
    }).then(sub=> console.log(JSON.stringify(sub)))
    .catch(err => console.log(err))
  }
}
