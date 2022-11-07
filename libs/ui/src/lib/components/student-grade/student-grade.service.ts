import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Score, StudentGrade } from '@skooltrak-app/models';

@Injectable()
export class StudentGradeService {
  private http = inject(HttpClient);

  public setGrade = (score: Score, query: { student: string; grade: string }) =>
    this.http.post<StudentGrade>(
      '/api/student-grades',
      { score },
      { params: { student: query.student, grade: query.student } }
    );
}
