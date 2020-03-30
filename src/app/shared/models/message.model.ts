import { User } from './users.model';
import { FileInfo } from './documents.model';

export interface Message {
  id: string;
  title: string;
  status: number;
  content: string;
  attached: FileInfo[];
  sender: User;
  receivers: User[];
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
