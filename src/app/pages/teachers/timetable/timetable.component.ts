import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherClassDay } from 'src/app/shared/models/teacher-class.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.sass'],
})
export class TimetableComponent implements OnInit {
  classWeek: Observable<TeacherClassDay[]>;
  constructor(
    private teacherService: TeachersService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.classWeek = this.teacherService.getSchedule(
      this.session.currentTeacher.id
    );
  }

  padWithZeroes(value: number, length: number) {
    let my_string = '' + value;
    while (my_string.length < length) {
      my_string = '0' + my_string;
    }
    return my_string;
  }
}
