import { User } from '../auth';
import { Message } from './messages.model';

export enum InboxStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  TRASH = 'TRASH',
}

export interface Inbox {
  receiver: User;
  message: Message;
  sender: User;
  subject: string;
  status: InboxStatus;
  arrivalAt: Date;
  readAt: Date | undefined;
}
