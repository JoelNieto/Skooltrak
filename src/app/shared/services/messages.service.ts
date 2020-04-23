import { Injectable } from '@angular/core';

import { Message, MessageInbox, Receiver } from '../models/message.model';
import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'Messages';
  }

  public getInbox(lastId: string = '', pageSize: number = 10) {
    const params = new HttpParams()
      .append('lastId', lastId)
      .append('pageSize', pageSize.toString());
    return this.http.get<MessageInbox[]>(`${this.url}`, null, params);
  }

  public getMessage(id: string) {
    return this.http.get<MessageInbox>(this.url, id);
  }

  public getSent() {
    return this.http.get<Message[]>(this.url, 'Sent');
  }

  public getDrafts() {
    return this.http.get<Message[]>(this.url, 'Drafts');
  }

  public getUnread() {
    return this.http.get<number>(this.url, 'Counter');
  }

  public getContacts() {
    return this.http.get<User[]>(this.url, 'Contacts');
  }

  public getReceivers() {
    return this.http.get<Receiver[]>(this.url, 'Receivers');
  }

  public setRead(id: string) {
    return this.http.post(`${this.url}/${id}/Read`, {});
  }

  public create(message: Message) {
    return this.http.post<Message>(this.url, message);
  }
}
