import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable()
export class HubService {
  newCardReceived = new EventEmitter<string>();
  newPresenceReceived = new EventEmitter<string>();

  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _cardHubConnection: HubConnection;
  private _presenceHubConnection: HubConnection;


  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private createConnection() {
    this._cardHubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44305/cardhub')
      .build();
    this._presenceHubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44305/presenceHub')
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
        setTimeout(this.startConnection(), 5000);
      });
    this._presenceHubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Presence Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._cardHubConnection.on('newCardReceived', (data: any) => {
      this.newCardReceived.emit(data);
    });
    this._presenceHubConnection.on('newPresenceReceived', (data: any) => {
      this.newPresenceReceived.emit(data);
    });
  }
}  
