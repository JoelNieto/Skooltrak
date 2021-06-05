import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AttendanceEnum } from 'src/app/shared/enums/attendance.enum';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { AttendanceSheet } from 'src/app/shared/models/attendance.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-attendance-form',
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
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.periods$ = this.storage.getFromStorage(StorageEnum.Periods);
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

      this.students$.subscribe(
        (students) => {
          this.sheet.students = students.map((x) => ({
            id: x.id,
            name: x.shortName,
            status: 1,
          }));
        },
        (err) => console.error(err)
      );
    } else {
      this.students$ = of([]);
      this.sheet.students = [];
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
