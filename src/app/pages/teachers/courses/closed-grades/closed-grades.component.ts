import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/shared/models/grades.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

import { GradesFormComponent } from '../grades-form/grades-form.component';

@Component({
  selector: 'app-closed-grades',
  templateUrl: './closed-grades.component.html',
  styleUrls: ['./closed-grades.component.sass'],
})
export class ClosedGradesComponent implements OnInit {
  @Input() course: Course;
  @Input() period: Period;

  grades$: Observable<Grade[]>;
  constructor(
    private coursesService: CoursesService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.grades$ = this.coursesService.getPeriodGrades(
      this.course.id,
      this.period.id
    );
  }

  showModal(grade: Grade) {
    const modalRef = this.modal.open(GradesFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.grades$ = this.coursesService.getGrades(this.course.id);
    });
    modalRef.componentInstance.grade = grade;
    modalRef.componentInstance.locked = true;
    modalRef.componentInstance.course = this.course;
  }
}
