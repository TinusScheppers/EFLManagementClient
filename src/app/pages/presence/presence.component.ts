import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { PresenceHubService } from '../../core/services/presencehub.service';

import { PresenceService } from '../../core/services/api.service';


@Component({
    selector: 'app-presence',
    templateUrl: './presence.component.html',
    styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
    username: string;
    card: string;

    chartOptions = {
        responsive: true,
        maintainAspectRatio: false
    };

    chartData: { data: number[]; }[];
    chartLabels = [];

    constructor(private hubService: PresenceHubService, private presenceService: PresenceService) {
        this.subscribeToEvents();
        this.getRecentPresences();
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

    private getRecentPresences() {
        this.presenceService.getPresences(12).subscribe((days) => {
            this.chartData = [{ data: days.map(d => d.presences) }];
            this.chartLabels = days.map(d => d.date.toDateString());
        });
    }
}
