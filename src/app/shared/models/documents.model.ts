import { Reference, User } from './users.model';

export interface CourseDocument {
  id: string;
  name: string;
  description: string;
  course: Reference;
  file: FileInfo;
  createDate: Date;
  createUser: User;
}

export interface FileInfo {
  id: string;
  type: string;
  fileName: string;
}
