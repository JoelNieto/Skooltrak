import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DaysEnum } from 'src/app/shared/enums/days.week.enum';
import {
  ClassDay,
  ClassGroup,
  ClassHour,
  Course,
} from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass'],
})
export class ScheduleComponent implements OnInit {
  @Input() group: ClassGroup;
  @Input() courses$: Observable<Course[]>;
  days = DaysEnum.WEEK_DAYS;
  reccess = DaysEnum.RECCESS;

  constructor(private groupsService: ClassGroupsService) {}

  ngOnInit(): void {
    if (!this.group.schedule?.length) {
      this.group.schedule = [];
      this.days.forEach((day) => {
        const current: ClassDay = {
          day: day.day,
          name: day.name,
          classHours: [],
        };
        this.group.schedule.push(current);
      });
      this.updateSchedule();
    }
  }

  public addHour() {
    this.group.schedule.forEach((day) => {
      const hour: ClassHour = {
        startTime: { hour: 12, minute: 0 },
        endTime: { hour: 12, minute: 0 },
        isSync: false,
      };
      day.classHours.push(hour);
    });
    this.updateSchedule();
  }

  updateSchedule() {
    this.groupsService.edit(this.group.id, this.group).subscribe(
      () => {},
      (err) => console.error(err)
    );
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
