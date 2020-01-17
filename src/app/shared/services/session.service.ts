import { Injectable } from '@angular/core';
import { User } from '../models/users.model';
import { School } from '../models/schools.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor() {}

  get currentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  set currentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  get currentSchool(): School {
    return JSON.parse(localStorage.getItem('currentSchool'));
  }

  set currentSchool(school: School) {
    localStorage.setItem('currentSchool', JSON.stringify(school));
  }
}
