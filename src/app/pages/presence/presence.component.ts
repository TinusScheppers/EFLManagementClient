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
    chartColors = [{ // https://stackoverflow.com/questions/39832874/how-do-i-change-the-color-for-ng2-charts
        backgroundColor: '#13a24b'
    }];

    dataUpdated: boolean;

    constructor(private hubService: PresenceHubService, private presenceService: PresenceService) {
        this.subscribeToEvents();
    }

    ngOnInit() {
        this.getRecentPresences();
    }

    private subscribeToEvents(): void {
        // this.hubService.connectionEstablished.subscribe(() => {
        //   this.canSendMessage = true;
        // });

        this.hubService.newPresenceReceived.subscribe((userName) => {
            this.username = userName;
            timer(5000).subscribe(() => this.username = null);
            this.getRecentPresences();
        });

        this.hubService.unknownCardReceived.subscribe((cardCode) => {
            this.card = cardCode;
            timer(5000).subscribe(() => this.card = null);
        });
    }

    private getRecentPresences() {
        this.presenceService.getPresences(12).subscribe((days) => {
            this.dataUpdated = false;
            this.chartData = [{ data: days.map(d => d.presences) }];
            this.chartLabels = days.map(d => d.date.toDateString());
            this.dataUpdated = true;
        });
    }
}
