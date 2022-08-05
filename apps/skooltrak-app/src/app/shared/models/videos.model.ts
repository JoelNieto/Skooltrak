import { FileInfo } from './documents.model';
import { Course } from './studyplans.model';
import { Reference, User } from './users.model';

export interface Video {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  assignment: Reference;
  tags: string[];
  published: boolean;
  uploadedBy: User;
  file: FileInfo;
  createdDate: Date;
}
