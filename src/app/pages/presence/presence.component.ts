import { Component, OnInit } from '@angular/core';

import { HubService } from '../../core/services/hub.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
  username: string;
  card: string;

  constructor(private hubService: HubService) {
    this.subscribeToEvents();
  }

  ngOnInit() {
  }

  private subscribeToEvents(): void {
    // this.hubService.connectionEstablished.subscribe(() => {
    //   this.canSendMessage = true;
    // });

    this.hubService.newPresenceReceived.subscribe((userName) => {
      this.username = userName;
      timer(5000).subscribe(() => this.username = null);
    });
  }

}
