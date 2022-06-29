import { User } from './auth/users.model';
import { UploadFile } from './documents.model';
import { Course } from './studyplans.model';

export interface Content {
  id: string;
  title: string;
  body: string;
  documents: UploadFile[];
  course: Course;
  createDate: string;
  modificateDate: Date;
  createUser: User;
}
