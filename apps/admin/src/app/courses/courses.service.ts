import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Course } from '@skooltrak-app/models';

@Injectable()
export class CoursesService {
  private http = inject(HttpClient);

  public getAll = () => this.http.get<Course[]>('/api/courses');

  public get = (id: string) => this.http.get<Course>(`/api/courses/${id}`);

  public post = (course: Partial<Course>) =>
    this.http.post<Course>('/api/courses', course);

  public patch = (id: string, course: Partial<Course>) =>
    this.http.patch<Course>(`/api/courses/${id}`, course);

  public delete = (id: string) => this.http.delete(`/api/courses/${id}`);
}
