import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';
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
  courses: Observable<Course[]>;
  table = new TableOptions();
  constructor(
    private teachersService: TeachersService,
    private translate: TranslocoService,
    private session: SessionService
  ) {
  }

  ngOnInit() {
    this.table.searcheable = false;
    this.table.lookup = true;
    this.table.detailsURL = [];
    this.table.columns = [
      {
        name: 'subject',
        title: this.translate.translate('Subject'),
        type: 'object',
        lookup: true,
        required: true
      },
      {
        name: 'plan',
        title: this.translate.translate('Plan'),
        type: 'object',
        lookup: true,
        required: true
      },
      {
        name: 'teachers',
        type: 'array',
        title: this.translate.translate('Teachers'),
        objectText: 'name',
        required: true
      }
    ];
    this.courses = this.teachersService.getCourses(
      this.session.currentUser.people[0].id
    );
  }
}
