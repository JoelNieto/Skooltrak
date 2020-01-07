import { ClassGroup } from './studyplans.model';

export interface Student {
  id: string;
  code: string;
  age: number;
  schoolId: string;
  firstName: string;
  middleName: string;
  surname: string;
  secondSurname: string;
  address: string;
  parents: Parent[];
  fullName: string;
  name: string;
  shortName: string;
  group: ClassGroup;
  birthDate: Date;
  gender: Gender;
  documentId: string;
  avatarURL: string;
  active: boolean;
  createDate: Date;
  modificateDate: Date;
}

export interface Parent {
  name: string;
  phoneNumber: string;
  mobileNumber: string;
  email: string;
  workAddress: string;
  address: string;
}
export interface Gender {
  id: number;
  name: string;
}
