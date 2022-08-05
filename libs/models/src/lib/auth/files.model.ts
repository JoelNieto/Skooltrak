import { User } from '.';
import { EntityBase } from '../base';

export interface UserFile extends EntityBase {
  name: string;
  type: string;
  url: string;
  owner: User;
  userShared: User[];
}
