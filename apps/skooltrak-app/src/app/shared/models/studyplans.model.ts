import { Period } from './periods.model';
import { Subject } from './subjects.model';
import { Reference, User } from './users.model';

export interface StudyPlan {
  id?: string;
  name?: string;
  schoolId?: string;
  description?: string;
  degree?: Reference;
  level?: Level;
  preschool: boolean;
  monthlyCost?: number;
  active?: boolean;
  createDate?: Date;
  hasUser?: boolean;
  skills?: string[];
  enrollCharges?: Charge[];
  modificateDate?: Date;
}

export interface Course {
  id?: string;
  name?: string;
  currentPeriod?: Period;
  subject?: Subject;
  parentSubject?: Subject;
  plan?: StudyPlan;
  icon?: string;
  color?: string;
  teachers?: Reference[];
  buckets?: GradeBucket[];
  weeklyHours?: number;
  createDate?: Date;
  modificateDate?: Date;
  currentScore?: number;
  active?: boolean;
}

export interface ParentSubject {
  id: string;
  name: string;
  score?: number;
  courses?: Course[];
}

export interface GradeBucket {
  id?: number;
  name?: string;
  weighting?: number;
}

export interface CourseMessage {
  id?: string;
  course?: Course;
  content?: string;
  teacher?: Reference;
  createUser?: User;
  createDate?: Date;
}

interface Charge {
  description?: string;
  cost?: number;
}

export interface Level {
  id?: number;
  name?: string;
  ordinal?: string;
}

export interface Degree {
  id?: string;
  schoolId?: string;
  name?: string;
  description?: string;
  active?: boolean;
}

export interface ClassGroup {
  id?: string;
  schoolId?: string;
  studentsCount?: number;
  level?: Level;
  name?: string;
  schedule?: ClassDay[];
  counselor?: Reference;
  studyPlan?: Reference;
  createDate?: Date;
  modificateDate?: Date;
}

export interface ClassDay {
  day: number;
  name: string;
  classHours: ClassHour[];
}

export interface ClassHour {
  startTime?: Hour;
  endTime?: Hour;
  isSync?: boolean;
  inPerson?: boolean;
  course?: Course;
}

export interface Hour {
  hour: number;
  minute: number;
}
