import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassDay } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.sass'],
})
export class TimeTableComponent implements OnInit {
  schedule: Observable<ClassDay[]>;
  constructor(
    private studentsService: StudentsService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.schedule = this.studentsService.getSchedule(
      this.session.currentStudent?.id
    );
  }
}
