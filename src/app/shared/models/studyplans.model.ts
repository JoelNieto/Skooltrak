import { Subject } from './subjects.model';
import { Reference } from './users.model';

export interface StudyPlan {
  id: string;
  name: string;
  schoolId: string;
  description: string;
  degree?: Reference;
  level: Level;
  monthlyCost: number;
  active: boolean;
  createDate: string;
  enrollCharges: Charge[];
  modificateDate: string;
}

export interface Course {
  id?: string;
  name?: string;
  subject: Subject;
  plan: Reference;
  teachers: Reference[];
  weeklyHours: number;
  createDate?: string;
  modificateDate?: string;
  active?: boolean;
}

interface Charge {
  description: string;
  cost: number;
}

export interface Level {
  id: number;
  name: string;
  ordinal: string;
}

export interface Degree {
  id?: string;
  schoolId?: string;
  name?: string;
  description?: string;
  active?: boolean;
}

export interface ClassGroup {
  id: string;
  schoolId: string;
  level: Level;
  name: string;
  counselor: Reference;
  studyPlan: Reference;
  createDate: Date;
  modificateDate: Date;
}
