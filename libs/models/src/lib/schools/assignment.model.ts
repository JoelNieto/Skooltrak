import { UserFile } from '../auth';
import { EntityBase } from '../base';
import { AssignmentType } from './assignment-type.model';
import { ClassGroup } from './class-groups.model';
import { Course } from './course.model';
import { StudyPlan } from './study-plan.model';
import { Teacher } from './teachers.model';

export interface Assignment extends EntityBase {
  title: string;
  description?: string | null;
  plan?: StudyPlan;
  course: Course;
  type: AssignmentType;
  group: ClassGroup;
  documents: UserFile[];
  teacher?: Teacher;
  start: Date;
  end: Date;
}
