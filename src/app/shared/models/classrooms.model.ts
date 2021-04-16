import { ClassGroup } from './studyplans.model';
import { User } from './users.model';

export interface Classroom {
  id?: string;
  name?: string;
  description?: string;
  groups?: ClassGroup[];
  public?: boolean;
  createdAt?: Date;
  createdBy?: User;
}
