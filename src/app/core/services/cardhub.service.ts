import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardHubService {
    newCardReceived = new EventEmitter<string>();

    connectionEstablished = new EventEmitter<Boolean>();

    private connectionIsEstablished = false;
    private _cardHubConnection: HubConnection;

    //TODO split hubs
    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    private createConnection() {
        this._cardHubConnection = new HubConnectionBuilder()
            .withUrl(environment.cardHubUri)
            .build();
    }

    private startConnection(): void {
        this._cardHubConnection
            .start()
            .then(() => {
                this.connectionIsEstablished = true;
                console.log('Card Hub connection started');
                this.connectionEstablished.emit(true);
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
                setTimeout(() => this.startConnection(), 5000);
            });
    }

    private registerOnServerEvents(): void {
        this._cardHubConnection.on('newCardReceived', (data: any) => {
            this.newCardReceived.emit(data);
        });
    }
}  
