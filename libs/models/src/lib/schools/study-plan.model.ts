import { EntityBase } from '../base';
import { LevelEnum, YearEnum } from '../enums';
import { Degree } from './degree.model';
import { School } from './schools.model';

export interface StudyPlan extends EntityBase {
  name: string;
  level: LevelEnum;
  degree: Degree;
  year: YearEnum;
  school: School;
  active: boolean;
}
