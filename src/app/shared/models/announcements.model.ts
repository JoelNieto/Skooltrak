import { Reference } from './users.model';

export interface Announcement {
  id: string;
  title: string;
  text: string;
  author: Reference;
  createdDate: Date;
  activeSince: Date;
  activeUntil: Date;
}
