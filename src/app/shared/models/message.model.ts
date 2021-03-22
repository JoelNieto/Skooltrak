import { FileInfo } from './documents.model';
import { ContentBlock } from './editor-content.model';
import { ClassGroup, Course } from './studyplans.model';
import { Reference, Role, User } from './users.model';

export interface Message {
  id?: string;
  title: string;
  status?: number;
  content?: string;
  contentBlocks?: ContentBlock[];
  attached?: FileInfo[];
  sender?: User;
  receivers?: Receiver[];
  sendDate?: Date;
  createDate?: Date;
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
  displayName: string;
  role: Role;
  description: string;
  course: Course;
  plan: Reference;
  group: ClassGroup;
  id: string;
}
