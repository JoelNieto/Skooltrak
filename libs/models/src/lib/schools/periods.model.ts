import { EntityBase } from '../base';

export interface Period extends EntityBase {
  name: string;
  startDate: Date;
  endDate: Date;
}
