import { EntityBase } from '../base';
import { Parent } from './parents.model';

export interface Student extends EntityBase {
  code: string;
  firstName: string;
  middleName: string;
  surname: string;
  secondSurname: string;
  email?: string;
  address: string;
  birthCountry: string;
  province: string;
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
