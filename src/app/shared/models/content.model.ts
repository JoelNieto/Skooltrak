import { UploadFile } from './documents.model';
import { Course } from './studyplans.model';
import { User } from './users.model';

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
