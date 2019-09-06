import { Component, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { PresenceHubService } from '../../core/services/presencehub.service';

import { PresenceService, User } from '../../core/services/api.service';

@Component({
    selector: 'app-presence',
    templateUrl: './presence.component.html',
    styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
    username: string;
    card: string;
    users: User[];

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    chartData: any[] = [{ data: [] }];
    chartLabels: string[] = [];
    chartColors: any[] = [{ // https://stackoverflow.com/questions/39832874/how-do-i-change-the-color-for-ng2-charts
        backgroundColor: '#13a24b',
        borderColor: '#13a24b'
    }];

    dataUpdated: boolean;

    constructor(private hubService: PresenceHubService, private presenceService: PresenceService, private datePipe: DatePipe) {
        this.subscribeToEvents();
    }

    ngOnInit() {
        this.getRecentPresences();
        timer(5000, 10000).subscribe(() => {
            this.getRecentPresences();
            this.getUsersForToday();
        });
    }

    private subscribeToEvents(): void {
        this.hubService.newPresenceReceived.subscribe((userName) => {
            this.username = userName;
            timer(5000).subscribe(() => this.username = null);
            this.getRecentPresences();
            this.getUsersForToday();
        });

        this.hubService.unknownCardReceived.subscribe((cardCode) => {
            this.card = cardCode;
            timer(5000).subscribe(() => this.card = null);
        });
    }

    private getRecentPresences() {
        this.presenceService.getPresences(3).subscribe((days) => {
            this.chartLabels = days.map(d => this.datePipe.transform(d.date, 'dd/MM/yyyy')); // format date datePipe issue: https://github.com/angular/angular/issues/15107
            this.chartData = [{ data: days.map(d => d.presences) }];
            this.refresh_chart();
        });
    }

    //Needed for label refresh, not for data:
    //https://stackoverflow.com/questions/42629819/ng2-charts-update-labels-and-data second answer
    private refresh_chart() {
        setTimeout(() => {
            if (this.chart && this.chart.chart && this.chart.chart.config) {
                this.chart.chart.config.data.labels = this.chartLabels;
                this.chart.chart.config.data.color = this.chartColors;
                this.chart.chart.update();
            }
        });
    }

    private getUsersForToday() {
        this.presenceService.getPresentUsersForDate(new Date()).subscribe((users) => {
            this.users = users;
        });
    }
}
