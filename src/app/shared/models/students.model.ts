import { Grade } from './grades.model';
import { Period } from './periods.model';
import { ClassGroup, Course, StudyPlan } from './studyplans.model';
import { Reference } from './users.model';

export interface Student {
  id: string;
  code: string;
  schoolId: string;
  firstName: string;
  middleName: string;
  surname: string;
  secondSurname: string;
  temporary: boolean;
  courses: Course[];
  email: string;
  notes: string;
  address: string;
  birthCountry: string;
  province: string;
  enrollDate: Date;
  plan: StudyPlan;
  originSchool: string;
  transferReason: string;
  guardians: Parent[];
  mother: Parent;
  father: Parent;
  score?: number;
  fullName: string;
  name: string;
  age: number;
  shortName: string;
  section: Reference;
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

export interface StudentSummary {
  id: string;
  fullName: string;
  name: string;
  plan: Reference;
  group: Reference;
  dueAmount: number;
  currentAmount: number;
  isDefault: boolean;
}

export interface PerformancePeriod {
  period: Period;
  grades: PerformanceDetail[];
}

export interface PerformanceDetail {
  course: Course;
  grade: number;
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

export interface GradeSummary {
  studentId: string;
  courses: SummaryCourse[];
}

interface SummaryCourse {
  course: Reference;
  grades: SummaryGrade[];
  children?: Child[];
}

interface Child {
  course: Course;
  grades: SummaryGrade[];
  children?: any;
}

interface SummaryGrade {
  period: Period;
  score: number;
}

export interface ArchiveGrade {
  id: string;
  student: Student;
  year: number;
  plan: StudyPlan;
  group: ClassGroup;
  school: Student;
  period: Period;
  grades: Grade[];
}
