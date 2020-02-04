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
