import { Injectable } from '@angular/core';

import { School } from '../models/schools.model';
import { User } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private CURRENT_USER: User;
  private CURRENT_SCHOOL: School;
  constructor() {}

  get currentUser(): User {
    return this.CURRENT_USER;
  }

  set currentUser(user: User) {
    this.CURRENT_USER = user;
  }

  get currentSchool(): School {
    return this.CURRENT_SCHOOL;
  }

  set currentSchool(school: School) {
    this.CURRENT_SCHOOL = school;
  }
}
