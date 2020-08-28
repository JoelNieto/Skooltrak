import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { TableOptions } from '@skooltrak/custom-components';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]>;
  table = new TableOptions();
  constructor(
    private studentService: StudentsService,
    private session: SessionService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.searcheable = false;
    this.table.lookup = true;
    this.table.detailsURL = [];
    this.table.columns = [
      {
        name: 'subject',
        title: this.transloco.translate('Subject'),
        type: 'object',
        lookup: true,
        required: true,
      },
      {
        name: 'teachers',
        type: 'array',
        title: this.transloco.translate('Teachers'),
        objectText: 'name',
        required: true,
      },
      {
        name: 'currentPeriod',
        type: 'object',
        title: this.transloco.translate('Current period'),
      },
      {
        name: 'currentScore',
        type: 'number'
      },
    ];
    this.courses = this.studentService.getCourses(
      this.session.currentUser.people[0].id
    );
  }
}
