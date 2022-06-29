import { Reference } from './auth/users.model';
import { Course } from './studyplans.model';

export interface Topic {
  id: string;
  name: string;
  description: string;
  course: Course;
  teacher: Reference;
  createDate: Date;
  modificateDate: Date;
  startDate: Date;
  dueDate: Date;
}
