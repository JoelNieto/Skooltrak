import { ClassGroup, Course, GradeBucket } from './studyplans.model';
import { Reference, User } from './users.model';

export interface Grade {
  id: string;
  title: string;
  bucket: GradeBucket;
  teacher: Reference;
  course: Course;
  date: Date;
  studentsGrades: StudentGrade[];
  groups: GradeGroup[];
  published: boolean;
  closed: boolean;
  createDate: Date;
  modificateDate: Date;
  createUser: User;
}

export interface GradeGroup {
  group: ClassGroup;
  students: StudentGrade[];
}

export interface StudentGrade {
  student: Reference;
  group: ClassGroup;
  comments: string;
  score: number;
  included: boolean;
}

export interface GradeStudent {
  id: string;
  grade: Reference;
  bucket: GradeBucket;
  student: Reference;
  comments: string;
  score: number;
  createDate: Date;
  modificateDate: Date;
}
