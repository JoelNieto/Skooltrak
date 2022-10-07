import { EntityBase } from '../base';
import { GradeTypeEnum } from '../enums';
import { Course } from '../schools';

export interface GradeType extends EntityBase {
  name: string;
  course: Course;
  type: GradeTypeEnum;
  weighting: number;
}
