import { Gender } from './students.model';
import { Subject } from './subjects.model';

export interface Teacher {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  email: string;
  firstName: string;
  middleName: string;
  surname: string;
  secondSurname: string;
  birthDate: Date;
  gender: Gender;
  subjects: Subject[];
  createDate: Date;
  modificateDate: Date;
}
