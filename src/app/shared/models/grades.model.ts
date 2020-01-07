import { Reference } from './users.model';

export interface Grade {
  id: string;
  title: string;
  subject: Reference;
  teacher: Reference;
  course: Reference;
  date: Date;
  published: boolean;
  closed: boolean;
  createDate: Date;
  modificateDate: Date;
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
