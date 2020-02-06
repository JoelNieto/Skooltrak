import { Course } from './studyplans.model';
import { Reference, User } from './users.model';

export interface Assignment {
  id: string;
  title: string;
  type: AssignmentType;
  description: string;
  course: Course;
  group: Reference;
  dueDate: string;
  teacher: Reference;
  createUser: User;
  createDate: string;
  modificateDate: string;
}

export interface AssignmentType {
  id: string;
  name: string;
  sumative: boolean;
}
