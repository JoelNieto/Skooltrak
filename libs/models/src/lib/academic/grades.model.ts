import { EntityBase } from '../base';
import { ClassGroup, Course, Teacher } from '../schools';
import { Student } from '../students';
import { GradeType } from './grade-type.model';

export interface Grade extends EntityBase {
  title: string;
  teacher: Teacher;
  course: Course;
  type: GradeType;
  date: Date;
  groups: ClassGroup[];
  published: boolean;
  closed: boolean;
}

export interface StudentGrade extends EntityBase {
  grade: Grade;
  student: Student;
  score: number;
  comments?: string;
}
