import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';

@Injectable()
export class PresenceHubService {
    newPresenceReceived = new EventEmitter<string>();
    unknownCardReceived = new EventEmitter<string>();

    connectionEstablished = new EventEmitter<Boolean>();

    private connectionIsEstablished = false;
    private _presenceHubConnection: HubConnection;

    //TODO split hubs
    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    private createConnection() {
        this._presenceHubConnection = new HubConnectionBuilder()
            .withUrl(environment.presenceHubUri)
            .build();
    }

    private startConnection(): void {
        this._presenceHubConnection
            .start()
            .then(() => {
                this.connectionIsEstablished = true;
                console.log('Presence Hub connection started');
                this.connectionEstablished.emit(true);
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
                setTimeout(() => this.startConnection(), 5000);
            });
    }
    
    private registerOnServerEvents(): void {
        this._presenceHubConnection.on('newPresenceReceived', (data: any) => {
            this.newPresenceReceived.emit(data);
        });
        this._presenceHubConnection.on('unknownCardReceived', (data: any) => {
            this.unknownCardReceived.emit(data);
        });
    }
}  
