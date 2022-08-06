import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '@skooltrak-app/models';

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  public getAll = () => this.http.get<Course[]>('/api/courses');

  public get = (id: string) => this.http.get<Course>(`/api/courses/${id}`);
}
