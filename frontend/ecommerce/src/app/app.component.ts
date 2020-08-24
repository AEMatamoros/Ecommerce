import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './services/push-notification.service';

const VAPID_PUBLIC = 'BBSR-UGUiP7fnpm5hYXaXRRKO5ASdRZs1F-Au5mcmW8fbci-jHgbAKMV1ZWPDPajIoLkjZsWCQ7zH5wYWartwZc';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ecommerce';

  constructor(private swPush: SwPush,
              private pushNotifications:PushNotificationService) {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          this.pushNotifications.sendSubscriptionToServer(subscription).subscribe();
        })
        .catch(console.error);
    }
  }
}
