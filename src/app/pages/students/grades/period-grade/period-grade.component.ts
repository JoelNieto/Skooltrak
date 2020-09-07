import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-period-grade',
  templateUrl: './period-grade.component.html',
  styleUrls: ['./period-grade.component.sass'],
})
export class PeriodGradeComponent implements OnInit {
  @Input() period: Period;
  $courses: Observable<Course[]>;
  $score: Observable<number>;
  constructor(
    public session: SessionService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.$courses = this.studentsService.getCourses(
      this.session.currentStudent.id,
      this.period.id
    );
    this.$score = this.studentsService.getPeriodScore(
      this.session.currentStudent.id,
      this.period.id
    );
  }
}
