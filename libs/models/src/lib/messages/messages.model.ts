import { User } from '../auth';
import { EntityBase } from '../base';

export interface Message extends EntityBase {
  subject: string;
  body: string;
  sender: User;
  receivers: User[];
}

export interface Contact {
  _id: string;
  type: 'teacher' | 'student' | 'admin' | 'parent' | 'group' | 'course';
}
