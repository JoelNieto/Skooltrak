import { FileInfo } from './documents.model';
import { Course } from './studyplans.model';
import { User } from './users.model';

export interface Video {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  tags: string[];
  published: boolean;
  uploadedBy: User;
  file: FileInfo;
  createdDate: Date;
}
