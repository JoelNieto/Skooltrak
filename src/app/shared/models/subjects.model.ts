import { Reference, User } from './users.model';

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  parent: Reference;
  code: string;
  createDate: string;
  modificateDate: string;
  createUser: User;
}
