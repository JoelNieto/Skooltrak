import { EntityBase } from '../base';
import { School } from './schools.model';

export interface Period extends EntityBase {
  name: string;
  sort: number;
  school: School;
  startDate: Date;
  endDate: Date;
}
