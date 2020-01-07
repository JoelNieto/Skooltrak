import { Reference } from './users.model';

export interface Assignment {
  id: string;
  title: string;
  type: AssignmentType;
  description: string;
  course: Reference;
  teacher: Reference;
  createDate: string;
  groupAssignments: GroupAssignment[];
  modificateDate: string;
}

interface GroupAssignment {
  group: Reference;
  dueDate: string;
}

export interface AssignmentType {
  id: string;
  name: string;
  sumative: boolean;
}
