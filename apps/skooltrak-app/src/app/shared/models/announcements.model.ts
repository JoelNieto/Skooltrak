import { User } from './users.model';

export interface Announcement {
  id: string;
  title: string;
  text: string;
  author: User;
  createdDate: Date;
  activeSince: Date;
  activeUntil: Date;
}
