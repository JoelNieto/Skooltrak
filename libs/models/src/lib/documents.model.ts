import { Reference, User } from './auth/users.model';
import { Course } from './studyplans.model';

export interface UploadFile {
  id: string;
  name: string;
  description: string;
  course: Course;
  assignment: Reference;
  student: Reference;
  forum: Reference;
  file: FileInfo;
  createDate: Date;
  createUser: User;
}

export interface FileInfo {
  id: string;
  type: string;
  size: number;
  fileName: string;
}
