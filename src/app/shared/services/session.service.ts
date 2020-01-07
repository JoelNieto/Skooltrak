import { Injectable } from '@angular/core';
import { User } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor() {}

  get currentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  set currentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
