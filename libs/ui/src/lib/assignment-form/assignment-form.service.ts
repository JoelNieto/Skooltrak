import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassGroup } from '@skooltrak-app/models';

@Injectable()
export class AssignmentFormService {
  constructor(private readonly http: HttpClient) {}

  getGroups = (plan: string) =>
    this.http.get<ClassGroup[]>('/api/class-groups', { params: { plan } });
}
