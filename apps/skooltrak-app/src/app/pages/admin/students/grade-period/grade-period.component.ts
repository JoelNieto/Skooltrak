import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-grade-period',
  templateUrl: './grade-period.component.html',
  styleUrls: ['./grade-period.component.sass'],
})
export class GradePeriodComponent implements OnInit {
  @Input() period: Period;
  @Input() student: Student;
  courses$: Observable<Course[]>;
  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.courses$ = this.studentsService.getCourses(
      this.student.id,
      this.period.id
    );
  }
}
