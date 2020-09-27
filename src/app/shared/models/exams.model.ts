import { UploadFile } from './documents.model';
import { Option } from './quizes.model';
import { ClassGroup, Course } from './studyplans.model';
import { Teacher } from './teachers.model';
import { Reference, User } from './users.model';

export interface Exam {
  id?: string;
  title?: string;
  description?: string;
  documents?: UploadFile[];
  course?: Course;
  teacher?: Teacher;
  questions?: ExamQuestion[];
  createUser?: User;
  createDate?: string;
  modificateDate?: string;
}

export interface ExamQuestion {
  questionText?: string;
  points?: number;
  type?: QuestionType;
  matchList?: MatchItem[];
  matchAnswers?: string[];
  options?: Option[];
  trueFalse?: boolean;
  numberAnswer?: number;
  textAnswer?: string;
}

export interface ExamResult {
  id?: string;
  assignation?: Reference;
  answers?: ExamAnswer[];
  course?: Course;
  exam?: Reference;
  student?: Reference;
  totalPoints?: number;
  points?: number;
  createDate?: Date;
  modificateDate?: Date;
  startDate?: Date;
  endDate?: Date;
  minutes?: number;
  status?: number;
}

export interface ExamAnswer {
  question?: ExamQuestion;
  points?: number;
  responseText?: string;
  responseNumber?: number;
  responseBoolean?: boolean;
  selection?: Option;
  matchList?: MatchItem[];
}

export interface MatchItem {
  optionText?: string;
  correctMatch?: string;
  selectedMatch?: string[];
  selected?: boolean;
}

export interface QuestionType {
  name?: string;
  code?: number;
}


export interface ExamAssignation {
  id?: string;
  title?: string;
  exam?: Exam;
  minutes?: number;
  course?: Course;
  startDate?: Date;
  endDate?: Date;
  group?: ClassGroup;
  teacher?: Teacher;
  createDate?: Date;
  createUser?: User;
}
