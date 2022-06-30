import { ClassGroup } from './studyplans.model';
import { User, Reference } from './users.model';
import { Student } from './students.model';

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  beginDate: Date;
  endDate: Date;
  allUsers: boolean;
  groups: ClassGroup[];
  createDate: Date;
  createUser: User;
}

export interface SurveyQuestion {
  questionText: string;
  options?: SurveyOption[];
  answerIndex?: number;
  answerText?: string;
}

export interface SurveyOption {
  answerText: string;
  count: number;
}

export interface SurveyAnswer {
  id?: string;
  user?: User;
  survey?: Reference;
  student?: Student;
  questions?: SurveyQuestion[];
  createDate?: string;
}