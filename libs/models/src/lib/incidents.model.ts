import { Reference, User } from './auth/users.model';
import { FileInfo } from './documents.model';
import { Student } from './students.model';
import { Course } from './studyplans.model';

export interface Incident {
  id: string;
  title?: string;
  details?: string;
  student: Student;
  course?: Course;
  incidentDate?: Date;
  documents?: FileInfo[];
  checks?: IncidentCheck[];
  updates?: IncidentUpdate[];
  createdBy?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncidentUpdate {
  user: User;
  details: string;
  createdAt: Date;
  action: Reference;
}

export interface IncidentCheck {
  user: User;
  checkedAt: Date;
}
