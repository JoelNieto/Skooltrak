import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
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
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  table = new TableOptions();
  constructor(
    private studentService: StudentsService,
    public coursesService: CoursesService,
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courses$ = this.studentService.getCourses(
      this.session.currentUser.people[0].id
    );
  }

  goToCourse(course: Course) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }
}
