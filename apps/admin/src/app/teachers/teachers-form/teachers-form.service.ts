import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from '@skooltrak-app/models';

@Injectable()
export class TeachersFormService {
  private http = inject(HttpClient);

  getSubjects = () => this.http.get<Subject[]>('/api/subjects');
}
