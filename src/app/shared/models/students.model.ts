import { ClassGroup } from './studyplans.model';

export interface Student {
  id: string;
  code: string;
  schoolId: string;
  firstName: string;
  middleName: string;
  surname: string;
  secondSurname: string;
  address: string;
  birthCountry: string;
  province: string;
  enrollDate: Date;
  originSchool: string;
  transferReason: string;
  guardians: Parent[];
  mother: Parent;
  father: Parent;
  fullName: string;
  name: string;
  age: number;
  shortName: string;
  group: ClassGroup;
  birthDate: Date;
  gender: Gender;
  documentId: string;
  avatarURL: string;
  active: boolean;
  medicalInfo: MedicalInfo;
  createDate: Date;
  modificateDate: Date;
}

export interface MedicalInfo {
  bloodGroup: string;
  allergies: string;
  medicine: string;
  pediatrician: string;
  hospital: string;
}

export interface Gender {
  id: number;
  name: string;
}
export interface Parent {
  name: string;
  relation: string;
  nationality: string;
  documentId: string;
  phoneNumber: string;
  mobileNumber: string;
  email: string;
  workAddress: string;
  address: string;
}
