import { Reference, User } from './users.model';

export interface Payment {
  id: string;
  student: Reference;
  description: string;
  amount: number;
  referenceNumber: string;
  method: string;
  paymentDate: string;
  applications: Application[];
  createUser: User;
  createDate: string;
}

export interface Application {
  charge: Charge;
  amount: number;
}

export interface Charge {
  id: string;
  student: Reference;
  description: string;
  startDate: string;
  dueDate: string;
  amount: number;
  balance: number;
  createDate: string;
  status: string;
  paymentDate: string;
}
