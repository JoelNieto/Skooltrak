import { EntityBase } from '../base';
import { LevelEnum } from '../enums';
import { Degree } from './degree.model';
import { School } from './schools.model';
import { StudyPlan } from './study-plan.model';
import { Teacher } from './teachers.model';

export interface ClassGroup extends EntityBase {
  name: string;
  plan: StudyPlan;
  level: LevelEnum;
  degree: Degree;
  school: School;
  counselor: Teacher;
}
