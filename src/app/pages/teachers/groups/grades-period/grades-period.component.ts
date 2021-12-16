import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { Course, ParentSubject } from 'src/app/shared/models/studyplans.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-grades-period',
  templateUrl: './grades-period.component.html',
  styleUrls: ['./grades-period.component.sass'],
})
export class GradesPeriodComponent implements OnChanges {
  @Input() period: Period;
  @Input() student: Student;
  courses$: Observable<Course[]>;
  parentCourses$: Observable<ParentSubject[]>;
  score$: Observable<number>;
  constructor(private studentsService: StudentsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.student) {
      if (this.student) {
        this.parentCourses$ = this.studentsService.getParentCourses(
          this.student.id,
          this.period.id
        );
        this.courses$ = this.studentsService.getCourses(
          this.student.id,
          this.period.id
        );
        this.score$ = this.studentsService.getPeriodScore(
          this.student.id,
          this.period.id
        );
      }
    }
  }
}
