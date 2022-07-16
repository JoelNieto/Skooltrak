import { MedicalInfo, Parent, Student } from '@skooltrak-app/models';

import { DTOBase } from '../../shared/base.schema';

export class CreateStudentDto implements DTOBase<Student> {
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
