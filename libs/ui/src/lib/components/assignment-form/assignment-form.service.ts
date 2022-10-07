import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment, AssignmentType, ClassGroup } from '@skooltrak-app/models';

@Injectable()
export class AssignmentFormService {
  constructor(private readonly http: HttpClient) {}

  getGroups = (plan: string) =>
    this.http.get<ClassGroup[]>('/api/class-groups', { params: { plan } });

  postAssignment = (assignment: Partial<Assignment>) =>
    this.http.post<Assignment>('/api/assignments', assignment);

  updateAssignment = (id: string, assignment: Partial<Assignment>) =>
    this.http.patch<Assignment>(`/api/assignments/${id}`, assignment);

  getTypes = () => this.http.get<AssignmentType[]>('/api/assignment-types');
}
