import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

import { ForumPost } from '../models/forums.model';
import { ConnectionService } from './connection.service';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  public hubConnection: signalR.HubConnection;
  public messageConnection: signalR.HubConnection;
  public data: ForumPost[] = [];
  constructor(private conn: ConnectionService) {}

  public startForumConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.conn.urlAPI + 'forum_chat', {
        transport: signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Forum connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));

    this.hubConnection.onreconnecting((error) => {
      console.assert(
        this.hubConnection.state === signalR.HubConnectionState.Reconnecting
      );
      console.log(`Connection lost due to error "${error}". Reconnecting.`);
    });
  };

  public startMessageConnection = () => {
    this.messageConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.conn.urlAPI + 'messages_stream', {
        transport: signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .build();

    this.messageConnection
      .start()
      .then(() => console.log('Messages connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));

    this.messageConnection.onreconnecting((error) => {
      console.assert(
        this.messageConnection.state === signalR.HubConnectionState.Reconnecting
      );
      console.log(`Connection lost due to error "${error}". Reconnecting.`);
    });
  };

  public clearStream() {
    this.data = [];
  }
}
