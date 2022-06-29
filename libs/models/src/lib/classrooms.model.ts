import { User } from './auth/users.model';
import { ClassGroup } from './studyplans.model';

export interface Classroom {
  id?: string;
  name?: string;
  description?: string;
  groups?: ClassGroup[];
  public?: boolean;
  createdAt?: Date;
  createdBy?: User;
}
