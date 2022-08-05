import { ClassGroup, ClassHour } from './studyplans.model';

export interface TeacherClassDay {
  day: Day;
  classes: Class[];
}

interface Class {
  id: string;
  day: Day;
  group: ClassGroup;
  class: ClassHour;
}

interface Day {
  day: number;
  name: string;
}
