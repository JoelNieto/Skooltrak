import { Course } from './studyplans.model';
import { Reference } from './users.model';

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
