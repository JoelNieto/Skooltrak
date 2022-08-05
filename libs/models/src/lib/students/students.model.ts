import { EntityBase } from '../base';
import { Gender } from '../enums';
import { Parent } from './parents.model';

export interface Student extends EntityBase {
  firstName: string;
  middleName: string;
  surname: string;
  documentId: string;
  secondSurname: string;
  email?: string;
  address: string;
  enrollDate: Date;
  gender: Gender;
  guardians: Parent[];
  mother: Parent;
  father: Parent;
  birthDate: Date;
  medicalInfo: MedicalInfo;
}

export interface MedicalInfo {
  bloodGroup: string;
  allergies: string;
  medicine: string;
  pediatrician: string;
  hospital: string;
}
