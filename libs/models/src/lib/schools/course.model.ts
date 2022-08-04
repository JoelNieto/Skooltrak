import { EntityBase } from '../base';
import { LevelEnum } from '../enums';
import { Degree } from './degree.model';
import { School } from './schools.model';
import { StudyPlan } from './study-plan.model';
import { Subject } from './subject.model';
import { Teacher } from './teachers.model';

export interface Course extends EntityBase {
  subject: Subject;
  parentSubject?: Subject;
  teachers: Teacher[];
  plan: StudyPlan;
  degree: Degree;
  level: LevelEnum;
  school: School;
  weeklyHours: number;
  active: boolean;
}
