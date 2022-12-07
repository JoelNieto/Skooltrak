import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Degree, School } from '@skooltrak-app/models';

@Injectable()
export class StudyPlanFormService {
  private http = inject(HttpClient);

  public getSchools = () => this.http.get<School[]>('/api/schools');

  public getDegrees = () => this.http.get<Degree[]>('/api/degrees');
}
