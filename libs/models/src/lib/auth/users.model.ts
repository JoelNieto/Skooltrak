import { EntityBase } from '../base';
import { Teacher } from '../schools';
import { Student } from '../students';

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
export type PersonInfo = Record<Role, Teacher | Student | Student[]>;
