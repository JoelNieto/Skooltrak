import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '@skooltrak-app/models';

@Injectable()
export class StudentsService {
  constructor(private readonly http: HttpClient) {}

  public getAll = () => this.http.get<Student[]>('/api/students');

  public get = (id: string) => this.http.get<Student>(`/api/students/${id}`);

  public post = (student: Partial<Student>) =>
    this.http.post<Student>('/api/students', student);

  public patch = (id: string, student: Partial<Student>) =>
    this.http.patch<Student>(`/api/students/${id}`, student);

  public changePicture = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>('/api/files/avatar', formData, {
      params: { folder: 'students' },
    });
  };
}
