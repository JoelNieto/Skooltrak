import { Course } from './studyplans.model';
import { Reference, User } from './users.model';

export interface Assignment {
  id: string;
  title: string;
  type: AssignmentType;
  description: string;
  course: Course;
  group: Reference;
  startDate: Date;
  dueDate: Date;
  teacher: Reference;
  createUser: User;
  createDate: Date;
  modificateDate: Date;
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
