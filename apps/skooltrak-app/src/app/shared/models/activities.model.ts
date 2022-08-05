import { Course } from './studyplans.model';
import { User } from './users.model';

export interface Activity {
  id: string;
  description: string;
  type: number;
  course: Course;
  private: boolean;
  createdBy: User;
  createDate: Date;
}
