import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        query('.course-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(30, animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
        ]),
      ]),
    ]),
  ],
})
export class ListComponent implements OnInit {
  courses$: Observable<Course[]>;
  table = new TableOptions();
  errorObject = null;
  constructor(
    private studentService: StudentsService,
    public coursesService: CoursesService,
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courses$ = this.studentService
      .getCourses(this.session.currentUser.people[0].id)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorObject = err;
          return throwError(err);
        })
      );
  }

  goToCourse(course: Course) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }
}
