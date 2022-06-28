import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AttendanceEnum } from 'src/app/shared/enums/attendance.enum';
import { AttendanceSheet } from 'src/app/shared/models/attendance.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'skooltrak-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.sass'],
})
export class AttendanceFormComponent implements OnInit {
  @Input() course: Course;
  @Input() currentSheet: AttendanceSheet;

  sheet: AttendanceSheet;
  groups$: Observable<ClassGroup[]>;
  students$: Observable<Student[]>;
  periods$: Observable<Period[]>;
  options = AttendanceEnum.ATTENDANCE_OPTIONS_LIST;

  constructor(
    public modal: NgbActiveModal,
    private coursesService: CoursesService,
    public groupsService: ClassGroupsService,
    public session: SessionService,
    private periodsService: PeriodsService
  ) {}

  ngOnInit(): void {
    this.periods$ = this.periodsService.getAll();
    if (this.currentSheet) {
      this.sheet = this.currentSheet;
    } else {
      this.sheet = {
        course: this.course,
        period: this.course.currentPeriod,
        teacher: {
          id: this.session.currentTeacher.id,
          name: this.session.currentTeacher.name,
        },
      };
    }
    this.groups$ = this.coursesService.getGroups(this.course.id);
  }

  setGroup() {
    if (this.sheet.group) {
      this.students$ = this.groupsService.getStudents(this.sheet.group.id);

      this.students$.subscribe({
        next: (students) => {
          this.sheet.students = students.map((x) => ({
            id: x.id,
            name: x.shortName,
            status: 1,
          }));
        },
        error: (err) => console.error(err),
      });
    } else {
      this.students$ = of([]);
      this.sheet.students = [];
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
