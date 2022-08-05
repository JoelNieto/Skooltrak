import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherClassDay } from 'src/app/shared/models/teacher-class.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'skooltrak-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.sass'],
})
export class TimetableComponent implements OnInit {
  classWeek$: Observable<TeacherClassDay[]>;
  constructor(
    private teacherService: TeachersService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.classWeek$ = this.teacherService
      .getSchedule(this.session.currentTeacher.id)
      .pipe(
        map((res) => {
          res.map((day) => {
            day.classes = day.classes
              .filter((x) => x.class.startTime.hour >= 3)
              .concat(day.classes.filter((x) => x.class.startTime.hour < 3));
          });
          return res;
        })
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
