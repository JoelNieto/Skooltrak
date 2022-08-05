import { UploadFile } from './documents.model';
import { Course } from './studyplans.model';
import { Reference, User } from './users.model';

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
  type?: string;
  file?: UploadFile;
  forum?: Reference;
  content?: string;
  createDate?: Date;
  createdBy?: User;
}
