import { Student, StudentSummary } from './students.model';
import { Course } from './studyplans.model';
import { User } from './users.model';

export interface Incident {
  id: string;
  title?: string;
  details?: string;
  student: Student;
  course?: Course;
  incidentDate?: Date;
  documents?: Document[];
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
}

export interface IncidentCheck {
  user: User;
  checkedAt: Date;
}
