import { Course, GradeBucket } from './studyplans.model';
import { Reference, User } from './users.model';

export interface Grade {
  id: string;
  title: string;
  bucket: GradeBucket;
  teacher: Reference;
  course: Course;
  date: Date;
  studentsGrades: StudentsGrade[];
  published: boolean;
  closed: boolean;
  createDate: Date;
  modificateDate: Date;
  createUser: User;
}

export interface StudentsGrade {
  student: Reference;
  comments: string;
  score: number;
}

export interface StudentGrade {
  id: string;
  grade: Reference;
  student: Reference;
  comments: string;
  score: number;
  createDate: Date;
  modificateDate: Date;
}
