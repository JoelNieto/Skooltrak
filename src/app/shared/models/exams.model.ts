import { Option } from './quizes.model';
import { ClassGroup, Course } from './studyplans.model';
import { Teacher } from './teachers.model';
import { User } from './users.model';

export interface Exam {
  id: string;
  title: string;
  description: string;
  course: Course;
  teacher: Teacher;
  questions: ExamQuestion[];
  createUser: User;
  createDate: string;
  modificateDate: string;
}

export interface ExamQuestion {
  questionText: string;
  points: number;
  type: QuestionType;
  matchList: MatchItem[];
  matchAnswers: string[];
  options: Option[];
  trueFalse: boolean;
}

export interface MatchItem {
  optionText: string;
  correctMatch: string;
  selectedMatch: string[];
  selected: boolean;
}

export interface QuestionType {
  name: string;
  code: number;
}


export interface ExamAssignation {
  id: string;
  title: string;
  exam: Exam;
  minutes: number;
  course: Course;
  startDate: Date;
  endDate: Date;
  group: ClassGroup;
  teacher: Teacher;
  createDate: Date;
  createUser: User;
}
