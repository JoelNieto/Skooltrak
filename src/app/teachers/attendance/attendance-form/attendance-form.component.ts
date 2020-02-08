import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { AttendanceEnum } from 'src/app/shared/enums/attendance.enum';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.sass']
})
export class AttendanceFormComponent implements OnInit {
  courses: Observable<Course[]>;
  groups: Observable<ClassGroup[]>;
  students: Observable<Student[]>;
  options = AttendanceEnum.ATTENDANCE_OPTIONS_LIST;

  currentCourse: Course = undefined;
  currentGroup: ClassGroup = undefined;
  constructor(
    private session: SessionService,
    private teachersService: TeachersService,
    private coursesService: CoursesService,
    private groupsService: ClassGroupsService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.courses = this.teachersService.getCourses(
      this.session.currentUser.people[0].id
    );
  }

  getGroups(): void {
    if (this.currentCourse) {
      this.groups = this.coursesService.getGroups(this.currentCourse.id);
    } else {
      this.currentGroup = undefined;
      this.groups = of([]);
    }
  }

  getStudents(): void {
    if (this.currentGroup) {
      this.students = this.groupsService.getStudents(this.currentGroup.id);
    } else {
      this.students = of([]);
    }
  }
}
