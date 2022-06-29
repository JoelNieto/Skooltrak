import { Reference } from './auth/users.model';
import { ClassGroup, StudyPlan } from './studyplans.model';

export interface StudentBalance {
  student: Reference;
  group: ClassGroup;
  plan: StudyPlan;
  dueAmount: number;
  currentAmount: number;
}
