import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Course } from '@skooltrak-app/models';

@Injectable()
export class CoursesService {
  private http = inject(HttpClient);

  public getAll = () => this.http.get<Course[]>('/api/courses');
}
