import { Reference, User } from './users.model';

export interface UploadFile {
  id: string;
  name: string;
  description: string;
  course: Reference;
  forum: Reference;
  file: FileInfo;
  createDate: Date;
  createUser: User;
}

export interface FileInfo {
  id: string;
  type: string;
  fileName: string;
}
