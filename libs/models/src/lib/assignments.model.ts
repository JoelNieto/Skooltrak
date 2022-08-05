import { Reference, User } from './auth/users.model';
import { UploadFile } from './documents.model';
import { ContentBlock } from './editor-content.model';
import { Course } from './studyplans.model';

export interface Assignment {
  id: string;
  title: string;
  type: AssignmentType;
  description: string;
  course: Course;
  group: Reference;
  startDate: Date;
  dueDate: Date;
  contentBlocks: ContentBlock[];
  documents?: AssignmentDocument[];
  hasForum: boolean;
  uploadFile: boolean;
  uploadVideo: boolean;
  teacher: Reference;
  createUser: User;
  createDate: Date;
  modificateDate: Date;
}

export interface AssignmentDocument extends UploadFile {
  status: 'uploaded' | 'checked' | 'graded';
}

export interface AssignmentType {
  id: string;
  name: string;
  sumative: boolean;
}

export interface AssignmentsDay {
  date: Date;
  assignments: Assignment[];
}
