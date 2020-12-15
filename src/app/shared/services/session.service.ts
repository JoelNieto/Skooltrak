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
  private savedUser: User;
  private savedSchool: School;
  private savedStudent: Student;
  private savedTeacher: Teacher;
  private savedInbox: Observable<MessageInbox[]>;
  private count: number;
  constructor(private conn: ConnectionService) {}

  get currentUser(): User {
    return this.savedUser;
  }

  set currentUser(user: User) {
    this.savedUser = user;
  }

  get currentSchool(): School {
    return this.savedSchool;
  }

  set currentSchool(school: School) {
    this.savedSchool = school;
  }

  set currentStudent(student: Student) {
    this.savedStudent = student;
  }

  get currentStudent(): Student {
    return this.savedStudent;
  }

  set currentTeacher(teacher: Teacher) {
    this.savedTeacher = teacher;
  }

  get currentTeacher(): Teacher {
    return this.savedTeacher;
  }

  clearSession(): void {
    this.savedUser = null;
    this.savedStudent = null;
    this.savedTeacher = null;
    this.savedInbox = null;
  }

  set currentInbox(inbox: Observable<MessageInbox[]>) {
    this.savedInbox = inbox;
  }

  get currentInbox(): Observable<MessageInbox[]> {
    return this.savedInbox;
  }

  set messageCount(count: number) {
    this.count = count;
  }

  get messageCount(): number {
    return this.count;
  }

  addMessage(message: MessageInbox) {
    this.currentInbox
      .pipe(
        map((inbox) => {
          inbox.unshift(message);
          return inbox;
        })
      )
      .subscribe();
    this.count++;
  }

  readMessage() {
    this.count = this.count - 1;
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
