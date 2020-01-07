import { Level } from './studyplans.model';
import { Subject } from './subjects.model';
import { Reference } from './users.model';

export interface Quiz {
  id: string;
  title: string;
  createdBy: Reference;
  subject: Subject;
  level: Level;
  settings: Settings;
  questions: Question[];
  createDate: Date;
  modificateDate: Date;
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
