import { User, Reference } from './users.model';
import { Course } from './studyplans.model';

export interface AttendanceSheet {
  id: string;
  date: Date;
  course: Course;
  group: Reference;
  teacher: Reference;
  createUser: User;
  createDate: Date;
  modificateDate: Date;
  students: AttendanceStudent[];
}

export interface AttendanceStudent {
  id: string;
  name: string;
  status: number;
}
