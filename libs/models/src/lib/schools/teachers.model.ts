import { User } from '../auth';
import { EntityBase } from '../base';
import { Gender } from '../enums';
import { Subject } from './subject.model';

export interface Teacher extends EntityBase {
  firstName: string;
  middleName?: string;
  surname: string;
  secondSurname?: string;
  documentId: string;
  birthDate: Date;
  subjects: Subject[];
  notes: string;
  email: string;
  gender: Gender;
  user: User;
}
