import { Component, Input, OnInit } from '@angular/core';
import { group } from 'console';
import { Observable } from 'rxjs';
import { DaysEnum } from 'src/app/shared/enums/days.week.enum';
import { ClassDay, ClassGroup, ClassHour, Course } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass'],
})
export class ScheduleComponent implements OnInit {
  @Input() group: ClassGroup;
  days = DaysEnum.WEEK_DAYS;
  reccess = DaysEnum.RECCESS;
  courses: Observable<Course[]>;
  constructor(
    private planServices: StudyPlanService,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit(): void {
    this.courses = this.planServices.getCourses(this.group.studyPlan.id);
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
        isSync: false
      };
      day.classHours.push(hour);
    });
    this.updateSchedule();
  }

  updateSchedule() {
    this.groupsService.edit(this.group.id, this.group).subscribe(() => {});
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
