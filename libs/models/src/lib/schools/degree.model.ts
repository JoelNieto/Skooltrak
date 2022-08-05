import { EntityBase } from '../base';
import { LevelEnum } from '../enums';
import { School } from './schools.model';

export interface Degree extends EntityBase {
  name: string;
  level: LevelEnum;
  school: School;
  active: boolean;
}
