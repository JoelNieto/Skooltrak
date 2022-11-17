import { EntityBase } from '../base';
import { ClassGroup, Course, Period, Teacher } from '../schools';
import { Student } from '../students';
import { GradeType } from './grade-type.model';

export interface Grade extends EntityBase {
  title: string;
  teacher: Teacher;
  period: Period;
  course: Course;
  type: GradeType;
  date: Date;
  group: ClassGroup;
  published: boolean;
  closed: boolean;
}

export interface StudentGrade extends EntityBase {
  course: Course;
  grade: Grade;
  period: Period;
  student: Student;
  score: number;
  noGrade: boolean;
  comments?: string;
}

export type Score = number | 'NA' | 'SN';
