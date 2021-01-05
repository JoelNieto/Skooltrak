import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentGrade } from 'src/app/shared/models/grades.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[gradeDetails]',
  templateUrl: './grades-details.component.html',
  styleUrls: ['./grades-details.component.sass'],
})
export class GradesDetailsComponent implements OnInit {
  @Input() courseId: string;
  @Input() studentId: string;
  grades: Observable<StudentGrade[]>;
  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.grades = this.studentService.getCourseGrades(
      this.studentId,
      this.courseId
    );
  }
}

