import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StudentGrade } from '@skooltrak-app/models';

@Injectable()
export class StudentGradeService {
  private http = inject(HttpClient);

  public setGrade = (
    query: { student: string; grade: string },
    score: number | null
  ) =>
    this.http.post<StudentGrade>(
      '/api/student-grades',
      { score },
      { params: { student: query.student, grade: query.grade } }
    );
}
