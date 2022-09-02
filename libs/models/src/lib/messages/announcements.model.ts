import { User } from '../auth';
import { EntityBase } from '../base';
import { ClassGroup, Course, Degree, School, StudyPlan } from '../schools';

export interface Announcement extends EntityBase {
  text: string;
  author?: User;
  activeSince?: Date;
  activeUntil?: Date;
  school?: School;
  degrees?: Degree[];
  plans?: StudyPlan[];
  groups?: ClassGroup[];
  courses?: Course[];
}
