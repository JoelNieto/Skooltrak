import { Reference } from './users.model';

export interface Payment {
  id: string;
  description: string;
  amount: number;
  referenceNumber: string;
  method: string;
  paymentDate: Date;
  applications: Application[];
}

export interface Application {
  charge: Charge;
  amount: number;
}

export interface Charge {
  id: string;
  student: Reference;
  description: string;
  startDate: Date;
  dueDate: Date;
  amount: number;
  balance: number;
  createDate: Date;
  status: string;
  paymentDate: Date;
}
