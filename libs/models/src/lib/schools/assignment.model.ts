import { UserFile } from '../auth';
import { EntityBase } from '../base';
import { ClassGroup } from './class-groups.model';
import { Course } from './course.model';
import { StudyPlan } from './study-plan.model';
import { Teacher } from './teachers.model';

export interface Assignment extends EntityBase {
  title: string;
  description?: string;
  plan?: StudyPlan;
  course: Course;
  group: ClassGroup;
  documents: UserFile[];
  teacher?: Teacher;
  start?: Date;
  end: Date;
}
