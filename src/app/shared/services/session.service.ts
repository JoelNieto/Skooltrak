import { Injectable } from '@angular/core';

import { School } from '../models/schools.model';
import { Student } from '../models/students.model';
import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private CURRENT_USER: User;
  private CURRENT_SCHOOL: School;
  private CURRENT_STUDENT: Student;
  constructor(private conn: ConnectionService) {}

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

  set currentStudent(student: Student) {
    this.CURRENT_STUDENT = student;
  }

  get currentStudent(): Student {
    return this.CURRENT_STUDENT;
  }

  clearSession(): void {
    this.CURRENT_USER = null;
    this.CURRENT_STUDENT = null;
  }

  getAvatar(): string {
    if (this.currentUser.photoURL) {
      if (this.isValidURL(this.currentUser.photoURL)) {
        return this.currentUser.photoURL;
      } else {
        return this.getFile(this.currentUser.photoURL);
      }
    } else {
      return 'assets/img/default-avatar.png';
    }
  }

  isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  getFile(id: string) {
    return this.conn.urlAPI + 'files/' + id;
  }
}
