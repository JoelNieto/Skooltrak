import { Period } from './periods.model';
import { Course } from './studyplans.model';
import { Reference, User } from './users.model';

export interface AttendanceSheet {
  id?: string;
  date?: Date;
  course?: Course;
  group?: Reference;
  period?: Period;
  teacher?: Reference;
  createUser?: User;
  createDate?: Date;
  modificateDate?: Date;
  students?: AttendanceStudent[];
}

export interface AttendanceStudent {
  id?: string;
  name?: string;
  status?: number;
}
