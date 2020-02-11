import { Course } from './studyplans.model';
import { User, Reference } from './users.model';

export interface Forum {
  id?: string;
  name: string;
  course?: Course;
  description: string;
  createDate?: Date;
  createdBy?: User;
  lastPost?: Date;
  posts?: number;
}

export interface ForumPost {
  id?: string;
  forum?: Reference;
  content?: string;
  createDate?: Date;
  createdBy?: User;
}
