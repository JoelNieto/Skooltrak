import { ClassGroup, Course } from './studyplans.model';
import { Subject } from './subjects.model';
import { Reference, User } from './users.model';
import { Teacher } from './teachers.model';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  course: Course;
  settings: Settings;
  questions: Question[];
  createDate: Date;
  teacher: Teacher;
  modificateDate: Date;
  createUser: User;
}

export interface Question {
  questionText: string;
  points: number;
  options: Option[];
}

export interface Option {
  optionText: string;
  isCorrect: boolean;
}

export interface Settings {
  isRandom: boolean;
  allowContinue: boolean;
}

export interface QuizAssignation {
  id: string;
  title: string;
  quiz: Reference;
  startDate: Date;
  course: Course;
  endDate: Date;
  group: ClassGroup;
  createDate: Date;
  createUser: User;
}

export interface QuizResult {
  id: string;
  assignation: Reference;
  quiz: Reference;
  course: Course;
  student: Reference;
  answers: Answer[];
  grade?: number;
  totalPoints: number;
  points: number;
  createDate?: Date;
  modificateDate?: Date;
  startDate: Date;
  endDate: Date;
  status: number;
}

export interface Answer {
  question: Question;
  selected: Option;
  options?: Option[];
}
