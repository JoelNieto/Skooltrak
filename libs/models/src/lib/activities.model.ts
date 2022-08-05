import { User } from './auth/users.model';
import { Course } from './studyplans.model';

export interface Activity {
  id: string;
  description: string;
  type: number;
  course: Course;
  private: boolean;
  createdBy: User;
  createDate: Date;
}
