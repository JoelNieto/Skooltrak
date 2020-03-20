import { ClassGroup } from './studyplans.model';
import { Subject } from './subjects.model';
import { Reference, User } from './users.model';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  level: Reference;
  settings: Settings;
  questions: Question[];
  createDate: Date;
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
  startDate: string;
  endDate: string;
  group: ClassGroup;
  grade: Reference;
  createDate: Date;
  createUser: User;
}

export interface QuizResult {
  id: string;
  assignation: Reference;
  quiz: Reference;
  student: Reference;
  answers: Answer[];
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
}
