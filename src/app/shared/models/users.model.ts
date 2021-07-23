import { ClassGroup } from './studyplans.model';

export interface User {
  id: string;
  userName: string;
  password?: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  role?: Role;
  adminAccess?: Access[];
  group?: ClassGroup;
  blocked?: boolean;
  meetingBlocked?: boolean;
  people: Reference[];
  notificationMails: string[];
  registerDate: string;
  updatedAt?: Date;
}

export interface Profile {
  role: Role;
  code: string;
  active: boolean;
  registerDate: string;
  createDate: string;
}

export interface Role {
  id: string;
  name: string;
  code: number;
  description: string;
}

export interface Access {
  id: string;
  name: string;
}

export interface Reference {
  id: string;
  name: string;
}

export interface Login {
  userName: string;
  password: string;
}
