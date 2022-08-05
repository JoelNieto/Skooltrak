import { EntityBase } from '../base';

export interface Subject extends EntityBase {
  name: string;
  shortName: string;
  parent?: Subject;
  code?: string;
}
