import { User, Role, Reference } from './users.model';
import { FileInfo } from './documents.model';
import { Course, ClassGroup } from './studyplans.model';

export interface Message {
  id: string;
  title: string;
  status: number;
  content: string;
  attached: FileInfo[];
  sender: User;
  receivers: Receiver[];
  sendDate: Date;
  createDate: Date;
}

export interface MessageInbox {
  id: string;
  message: Message;
  receiver: User;
  read: boolean;
  arrivalDate: Date;
  readDate: Date;
}

export interface Receiver {
  name: string;
  role: Role;
  description: string;
  course: Course;
  plan: Reference;
  group: ClassGroup;
  userId: string;
}
