import { EntityBase } from '../base';

export interface User extends EntityBase {
  username: string;
  displayName: string;
  email: string;
  profileURL: string;
  role: Role;
  blocked: boolean;
  access?: AdminAccess;
}

export interface AdminAccess {
  academic: boolean;
  collection: boolean;
  grades: boolean;
  credits: boolean;
  registration: boolean;
}

export type Role = 'admin' | 'student' | 'teacher' | 'parent';
