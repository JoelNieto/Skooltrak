import { ClassGroup, StudyPlan } from './studyplans.model';
import { Reference } from './users.model';

export interface StudentBalance {
  student: Reference;
  group: ClassGroup;
  plan: StudyPlan;
  dueAmount: number;
  currentAmount: number;
}
