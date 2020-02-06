import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { TableOptions } from '@skooltrak/custom-components';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]>;
  table = new TableOptions();
  constructor(
    private teachersService: TeachersService,
    private translate: TranslateService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.table.searcheable = false;
    this.table.lookup = true;
    this.table.detailsURL = [];
    this.table.columns = [
      {
        name: 'subject',
        title: this.translate.instant('Subject'),
        type: 'object',
        lookup: true,
        required: true
      },
      {
        name: 'plan',
        title: this.translate.instant('Plan'),
        type: 'object',
        lookup: true,
        required: true
      },
      {
        name: 'teachers',
        type: 'array',
        title: this.translate.instant('Teachers'),
        objectText: 'name',
        required: true
      },
      {
        name: 'weeklyHours',
        type: 'number',
        title: this.translate.instant('Weekly Hours'),
        required: true
      }
    ];
    this.courses = this.teachersService.getCourses(
      this.session.currentUser.people[0].id
    );
  }
}
