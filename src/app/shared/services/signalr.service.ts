import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import * as signalR from '@microsoft/signalr';
import { ForumPost } from '../models/forums.model';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  public hubConnection: signalR.HubConnection;
  public data: ForumPost[] = [];
  constructor(private conn: ConnectionService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.conn.urlAPI + 'forum_chat', {
        transport: signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  };

  public clearStream() {
    this.data = [];
  }

  public listen(id: string) {
    return this.hubConnection.on(id, data => {
      this.data.unshift(data);
      console.log(data);
    });
  }
}
