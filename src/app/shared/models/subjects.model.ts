import { Reference, User } from './users.model';

export interface Subject {
  id?: string;
  name?: string;
  shortName?: string;
  parent?: Reference;
  code?: string;
  createDate?: Date;
  modificateDate?: Date;
  createUser?: User;
}
