import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { CourseEditComponent } from 'src/app/shared/components/course-edit/course-edit.component';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        query('.card-body', [
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
    private teachersService: TeachersService,
    public storage: StorageService,
    private router: Router,
    private modal: NgbModal,
    private route: ActivatedRoute,
    public coursesService: CoursesService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.courses$ = this.teachersService.getCourses(
      this.session.currentUser.people[0].id
    );
  }

  goToCourse(course: Course) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }

  edit(course: Course) {
    const modalRef = this.modal.open(CourseEditComponent, { centered: true });
    modalRef.componentInstance.course = course;
  }
}
