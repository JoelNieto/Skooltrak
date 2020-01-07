import { Reference } from './users.model';

export interface Charge {
  id: string;
  student: Reference;
  description: string;
  dueDate: Date;
  amount: number;
  balance: number;
  status: string;
  paymentDate: Date;
}

export interface PaymentDay {
  id?: string;
  title?: string;
  startDate?: Date;
  dueDate?: Date;
}
