import { EntityBase } from '../base';

export interface AssignmentType extends EntityBase {
  name: string;
  summative: boolean;
  color: 'red' | 'yellow' | 'blue';
}
