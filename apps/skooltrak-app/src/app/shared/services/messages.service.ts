import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Message, MessageInbox, Receiver } from '../models/message.model';
import { User } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'Messages/';
  }

  public getInbox(lastId: string = '', pageSize: number = 10) {
    const params = new HttpParams()
      .append('lastId', lastId)
      .append('pageSize', pageSize.toString());
    return this.http.get<MessageInbox[]>(this.url, { params });
  }

  public getMessage(id: string) {
    return this.http.get<MessageInbox>(`${this.url}${id}`);
  }

  public getMessageDetails(id: string) {
    return this.http.get<Message>(`${this.url}${id}/Details`);
  }

  public sentTrash(id: string) {
    return this.http.post(this.url + 'Trash', { id });
  }

  public recoverTrash(id: string) {
    return this.http.post(this.url + 'Recover', { id });
  }

  public getSent() {
    return this.http.get<Message[]>(this.url + 'Sent');
  }

  public getDrafts() {
    return this.http.get<Message[]>(this.url + 'Drafts');
  }

  public getTrash() {
    return this.http.get<MessageInbox[]>(this.url + 'Trash');
  }

  public getUnread() {
    return this.http.get<number>(this.url + 'Counter');
  }

  public getContacts() {
    return this.http.get<User[]>(this.url + 'Contacts');
  }

  public getReceivers() {
    return this.http.get<Receiver[]>(this.url + 'Receivers');
  }

  public setRead(id: string) {
    return this.http.post(`${this.url}${id}/Read`, {});
  }

  public create(message: Message) {
    return this.http.post<Message>(this.url, message);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }

  public deleteMessage(id: string) {
    return this.http.delete(`${this.url}${id}Sent`);
  }
}