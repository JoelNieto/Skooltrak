import { User } from '../auth';
import { EntityBase } from '../base';
import { Gender, LevelEnum } from '../enums';
import { ClassGroup, Degree, School, StudyPlan } from '../schools';
import { Parent } from './parents.model';

export interface Student extends EntityBase {
  firstName: string;
  middleName?: string;
  surname: string;
  documentId: string;
  secondSurname?: string;
  school: School;
  degree: Degree;
  level: LevelEnum;
  plan: StudyPlan;
  group: ClassGroup;
  email?: string;
  address: string;
  enrollYear: number;
  gender: Gender;
  guardians: Parent[];
  mother: Parent;
  father: Parent;
  birthDate: Date;
  medicalInfo: MedicalInfo;
  profilePicURL?: string;
  user: User;
}

export interface MedicalInfo {
  bloodGroup: string;
  allergies: string;
  medicine: string;
  pediatrician: string;
  hospital: string;
}
