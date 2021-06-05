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
      .then(() => console.info('Forum connection started'))
      .catch((err) => console.info('Error while starting connection: ' + err));

    this.hubConnection.onreconnecting((error) => {
      // eslint-disable-next-line no-console
      console.assert(
        this.hubConnection.state === signalR.HubConnectionState.Reconnecting
      );
      console.error(`Connection lost due to error "${error}". Reconnecting.`);
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
      .then(() => console.info('Messages connection started'))
      .catch((err) => console.error('Error while starting connection: ' + err));

    this.messageConnection.onreconnecting((error) => {
      // eslint-disable-next-line no-console
      console.assert(
        this.messageConnection.state === signalR.HubConnectionState.Reconnecting
      );
      console.error(`Connection lost due to error "${error}". Reconnecting.`);
    });
  };

  public clearStream() {
    this.data = [];
  }
}
