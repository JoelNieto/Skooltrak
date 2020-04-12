import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MessageInbox } from '../models/message.model';
import { School } from '../models/schools.model';
import { Student } from '../models/students.model';
import { Teacher } from '../models/teachers.model';
import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private CURRENT_USER: User;
  private CURRENT_SCHOOL: School;
  private CURRENT_STUDENT: Student;
  private CURRENT_TEACHER: Teacher;
  private CURRENT_INBOX: Observable<MessageInbox[]>;
  private MESSAGE_COUNT: number;
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

  set currentTeacher(teacher: Teacher) {
    this.CURRENT_TEACHER = teacher;
  }

  get currentTeacher(): Teacher {
    return this.CURRENT_TEACHER;
  }

  clearSession(): void {
    this.CURRENT_USER = null;
    this.CURRENT_STUDENT = null;
  }

  set currentInbox(inbox: Observable<MessageInbox[]>) {
    this.CURRENT_INBOX = inbox;
  }

  get currentInbox(): Observable<MessageInbox[]> {
    return this.CURRENT_INBOX;
  }

  set messageCount(count: number) {
    this.MESSAGE_COUNT = count;
  }

  get messageCount(): number {
    return this.MESSAGE_COUNT;
  }

  addMessage(message: MessageInbox) {
    this.currentInbox.pipe(
      map(inbox => {
        inbox.unshift(message);
        return inbox;
      })
    ).subscribe();
    this.MESSAGE_COUNT++;
  }

  readMessage() {
    this.MESSAGE_COUNT = this.MESSAGE_COUNT - 1;
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
