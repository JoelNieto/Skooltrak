import { Reference } from './auth/users.model';

export interface PaymentDay {
  id?: string;
  title?: string;
  startDate?: Date;
  dueDate?: Date;
}

export interface Summary {
  key: Reference;
  sum: number;
}
