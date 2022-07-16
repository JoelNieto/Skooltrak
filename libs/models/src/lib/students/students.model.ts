import { EntityBase } from '../base';
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
  guardians: Parent[];
  mother: Parent;
  father: Parent;
  birthDate: string;
  medicalInfo: MedicalInfo;
}

export interface MedicalInfo {
  bloodGroup: string;
  allergies: string;
  medicine: string;
  pediatrician: string;
  hospital: string;
}
