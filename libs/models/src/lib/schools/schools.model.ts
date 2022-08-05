import { EntityBase } from '../base';

export interface School extends EntityBase {
  name: string;
  shortName: string;
  logoURL: string;
  website: string;
  currentYear: number;
  address: string;
  motto: string;
}
