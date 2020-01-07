import { Gender } from './students.model';
import { Subject } from './subjects.model';

export interface Teacher {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  firstName: string;
  middleName: string;
  surname: string;
  secondSurname: string;
  birthDate: string;
  gender: Gender;
  subjects: Subject[];
  createDate: string;
  modificateDate: string;
}

