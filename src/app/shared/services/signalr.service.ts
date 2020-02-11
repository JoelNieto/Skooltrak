import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import * as signalR from '@aspnet/signalr';
import { ForumPost } from '../models/forums.model';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public data: ForumPost[];
  constructor(private conn: ConnectionService) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.conn.urlAPI + 'forum_chat')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public listen(id: string) {
    return this.hubConnection.on(id, data => {
      this.data = data;
      console.log(data);
    });
  }
}
