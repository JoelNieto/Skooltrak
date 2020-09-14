import { Subject } from './subjects.model';
import { Teacher } from './teachers.model';
import { Reference, User } from './users.model';
import { Period } from './periods.model';

export interface StudyPlan {
  id?: string;
  name?: string;
  schoolId?: string;
  description?: string;
  degree?: Reference;
  level?: Level;
  monthlyCost?: number;
  active?: boolean;
  createDate?: string;
  hasUser?: boolean;
  enrollCharges?: Charge[];
  modificateDate?: string;
}

export interface Course {
  id?: string;
  name?: string;
  currentPeriod?: Period;
  subject?: Subject;
  plan?: StudyPlan;
  icon?: string;
  color?: string;
  teachers?: Reference[];
  buckets?: GradeBucket[];
  weeklyHours?: number;
  createDate?: string;
  modificateDate?: string;
  currentScore?: number;
  active?: boolean;
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
  createDate?: string;
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
  level?: Level;
  name?: string;
  counselor?: Reference;
  studyPlan?: Reference;
  createDate?: Date;
  modificateDate?: Date;
}
