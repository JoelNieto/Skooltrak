import { Reference, User } from './users.model';

export interface Payment {
  id?: string;
  student?: Reference;
  description?: string;
  creditNote?: boolean;
  amount?: number;
  referenceNumber?: string;
  method?: string;
  paymentDate?: Date;
  applications?: Application[];
  createUser?: User;
  createDate?: Date;
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
  paymentDate: string;
}
